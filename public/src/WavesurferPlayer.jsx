import React, { useState, useRef, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteModal from "./DeleteModal";
import TransitionsModal from "./TransitionModal";

// import RecordingButtons from "./RecordingButtons";

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  console.log("container reference", containerRef);
  console.log(options.url, "THIS IS OPTIONS")

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
const WaveSurferPlayer = (props, startRecording, stopRecording) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);
  console.log(props, "these are props WAVESURFER PLAYER");
  const blobUrl = props.url || null;
  const baseId = props.baseId || null;
  const baseString = props.baseString || null;
  console.log(baseString,"Base String");

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

  return (
    <>
      <div
        ref={containerRef}
        style={{
          minHeight: "120px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      />
      {/* <p>{statusUpdate}</p> */}
      {/* <RecordingButtons startRecording={startRecording} stopRecording={stopRecording}/> */}
      {/* <p>{currentTime}</p> */}
      <div style={{flexDirection:"row"}}>
        {" "}
        <Button
          small
          onClick={onPlayClick}
          style={{ marginTop: "1em", justifyContent: "center" }}
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
        <TransitionsModal blobUrl={blobUrl} baseString={baseString}/>
        <DeleteModal baseId={baseId}/>
      </div>
    </>
  );
};

export default WaveSurferPlayer;
