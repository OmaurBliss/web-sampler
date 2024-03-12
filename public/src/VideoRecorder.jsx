import { useReactMediaRecorder } from "react-media-recorder";
import React from "react";
import { Box } from "@mui/material";
const VideoRecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  return (
    <div>
      {/* <p>{status}</p> */}
      <Box>
        {" "}
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </Box>
      {/* <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button> */}
      {status === "stopped" ? (
        <video src={mediaBlobUrl} controls autoPlay loop />
      ) : (
        <video style={{display:"hidden"}} src={mediaBlobUrl} controls autoPlay loop />
      )}
    </div>
  );
};

export default VideoRecordView;
