import React, { useState, useRef, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteModal from "./DeleteModal";
import TransitionsModal from "./TransitionModal";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

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
const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);
  console.log(props, "these are props WAVESURFER PLAYER");
  const startRecording = props.startRecording;
  const stopRecording = props.stopRecording;
  const status = props.status;
  const blobUrl = props.url || null;
  const baseId = props.baseId || null;
  const baseString = props.baseString || null;
  console.log(baseString, "Base String");

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  const onSaveIconClick =
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!wavesurfer) return;

      setCurrentTime(0);
      setIsPlaying(false);

      const subscriptions = [
        wavesurfer.on("play", () => setIsPlaying(true)),
        wavesurfer.on("pause", () => setIsPlaying(false)),
        wavesurfer.on("timeupdate", (currentTime) =>
          setCurrentTime(currentTime)
        ),
      ];

      return () => {
        subscriptions.forEach((unsub) => unsub());
      };
    }, [wavesurfer]);

  let startRecordingIcon =
    status === "recording" ? (
      <div style={{ color: "red" }}>
        <MicIcon />
      </div>
    ) : (
      <div style={{ color: "black" }}>
        <MicIcon />
      </div>
    );
  let stopRecordingIcon =
    status === "stopped" ? (
      <div style={{ color: "red" }}>
        <StopIcon />
      </div>
    ) : (
      <div style={{ color: "black" }}>
        <StopIcon />
      </div>
    );

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
      {/* <p>{statusUpdate}</p> */}
      {/* <RecordingButtons startRecording={startRecording} stopRecording={stopRecording}/> */}
      {/* <p>{currentTime}</p> */}
      <div style={{ position: "relative", paddingTop: "20px", paddingBottom: "80px"}}>
        {" "}
        {/* <Button style={{ margin: "10px" }} small onClick={() => startRecording}>
            {startRecordingIcon}
          </Button>
          <Button
            style={{ margin: "10px" }}
            small
           
            onClick={() => stopRecording}
          >
            {stopRecordingIcon}
          </Button> */}
        {/* <Button
            onClick={() => {
              console.log("clicked");
              // getBase64ToBlob();
            }}
            style={{ border: "1px solid black" }}
          >
            PRESS ME
          </Button> */}
        <div style={{ position: "absolute", left: 0 }}>
          <Button
            small
            onClick={onPlayClick}
          >
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
        <div style={{ position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"}}>
          {" "}
          <TransitionsModal blobUrl={blobUrl} baseString={baseString} />
        </div>
        <div style={{position: "absolute", right: 0}}>
          <DeleteModal baseId={baseId} />
        </div>
      </div>
    </>
  );
};

export default WaveSurferPlayer;
