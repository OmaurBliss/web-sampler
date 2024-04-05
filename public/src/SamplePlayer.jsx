import React, { useState, useRef, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteModal from "./DeleteModal";
import TransitionsModal from "./TransitionModal";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import MicNoneIcon from "@mui/icons-material/MicNone";
import Checkbox from "@mui/material/Checkbox";

// import RecordingButtons from "./RecordingButtons";

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  console.log("container reference", containerRef);
  console.log(options.url, "THIS IS OPTIONS");

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a  React component that will render wavesurfer.
// Props are wavesurfer options.
const SamplePlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrollingWaveform, setScrollingWaveform] = useState(false);
  const [audioUrl, setAudioUrl] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const wavesurfer = useWavesurfer(containerRef, props);
  console.log(props, "these are props WAVESURFER PLAYER");
  const status = props.status;
  const blobUrl = props.url || null;
  const baseId = props.baseId || null;
  const baseString = props.baseString || null;
  console.log(baseString, "Base String");

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  const record = wavesurfer?.registerPlugin(
    RecordPlugin.create({
      scrollingWaveform: false,
      renderRecordedAudio: false,
    })
  );

  const stopRecording = () => {
    record?.on("record-end", (blob) => {
      const recordedUrl = URL.createObjectURL(blob);
      console.log("recorded:", recordedUrl);

      setAudioUrl(recordedUrl);
      setIsRecording(false);
    });
  };

  const startRecord = () => {
    record?.on("record-start", () => setIsRecording(true));
    if(isRecording ===  true){
      console.log("stop recording")
      stopRecording();

    }

    const deviceId = RecordPlugin.getAvailableAudioDevices().then((devices) => {
      return devices[0].deviceId;
    });

    record.startRecording({ deviceId }).then(() => {
      console.log("recording");
    });
  };

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          minHeight: "120px",
          border: "1px solid ",
          borderRadius: "5px",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      />
      <Checkbox />
      {/* <p>{statusUpdate}</p> */}
      {/* <RecordingButtons startRecording={startRecording} stopRecording={stopRecording}/> */}
      {/* <p>{currentTime}</p> */}
      <div
        style={{
          position: "relative",
          paddingTop: "20px",
          paddingBottom: "80px",
        }}
      >
        <div style={{ position: "absolute", left: 0 }}>
          <Button small onClick={onPlayClick}>
            {isPlaying ? (
              <div style={{ color: "black" }}>
                <PauseIcon />
              </div>
            ) : (
              <div style={{ color: "red" }}>
                <PlayArrowIcon />
              </div>
            )}
          </Button>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Button onClick={startRecord} style={{ minWidth: "5em" }}>
            {isRecording === true ? "Stop record" : "Start record"}
          </Button>

          <TransitionsModal blobUrl={blobUrl} baseString={baseString} />
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <DeleteModal baseId={baseId} />
        </div>
      </div>
    </>
  );
};

export default SamplePlayer;
