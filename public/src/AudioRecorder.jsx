import { useReactMediaRecorder } from "react-media-recorder";
import PropTypes from "prop-types";
import React from "react";
// import Sampler from "./Sampler";
import WaveSurferPlayer from "./AudioVisualizer";
import { Box, Button } from "@material-ui/core";
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";

const AudioRecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  console.log(mediaBlobUrl);
  console.log(startRecording);
  console.log(stopRecording);

  // let statusUpdate =
  //   status === "recording" ? (
  //     <div>
  //       <MicIcon />
  //     </div>
  //   ) : (
  //     ""
  //   );
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
  console.log();
  return (
    <div>
      <Box
        border="3px grey solid"
        width="600px"
        margin="20px"
        borderRadius="5px"
        padding="20px"
        style={{boxShadow: "12px 12px 2px 1px lightGrey"}}
      >
        <h1>Web Sampler</h1>{" "}
        <span style={{ flex: "column" }}>
          <Button
            style={{ margin: "10px" }}
            small
            onClick={startRecording}
          >
            {startRecordingIcon}
          </Button>
          <Button
            style={{ margin: "10px" }}
            small
            onClick={stopRecording}
          >
            {stopRecordingIcon}
          </Button>
          {/* <p>{statusUpdate}</p> */}
        </span>
        <WaveSurferPlayer
          height={100}
          waveColor="rgb(200, 0, 200)"
          progressColor="rgb(100, 0, 100)"
          url={mediaBlobUrl}
        />
      </Box>
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      <br></br>
      {/* <Sampler url={mediaBlobUrl} /> */}
    </div>
  );
};

AudioRecordView.propTypes = {
  mediaBlobUrl: PropTypes.string,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  statusUpdate: PropTypes.string,
};

export default AudioRecordView;
