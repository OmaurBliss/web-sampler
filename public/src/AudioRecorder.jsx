import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import PropTypes from "prop-types";
// import Sampler from "./Sampler";
import WaveSurferPlayer from "./WavesurferPlayer";
import { Box, Button } from "@material-ui/core";
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SampleList from "./SampleList";
// import SamplePlayer from "./SamplePlayer";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import TransitionsModal from "./TransitionModal";
// import VideoRecordView from "./VideoRecorder";
import { Buffer } from "buffer";
const AudioRecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const [urlBlob, setUrlBlob] = useState();
  const [baseString, setBaseString] = useState();
  const [isVideo, setIsVideo] = useState(false);

  const getBase64ToBlob = async () => {
    //converting to base64
    await axios
      .get(mediaBlobUrl, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        let resultData = new Buffer.from(response.data, "binary").toString(
          "base64"
        );
        setBaseString(resultData);
        console.log(resultData, "RESULT DATA YO");
        // const byteCharacters = atob(resultData);
        // const byteArrays = [];
        // for (let i = 0; i < byteCharacters.length; i++) {
        //   byteArrays.push(byteCharacters.charCodeAt(i));
        // }
        // const byteArray = new Uint8Array(byteArrays);
        // let newBlob = new Blob([byteArray], { type: "audio/wav" })
        // let newBlobUrl = URL.createObjectURL(newBlob);
        // setUrlBlob(newBlobUrl);
        // console.log(newBlobUrl,"This is your new URL HERE!!!")
      });

    // return { data: result };
    // console.log(typeof result);
    // console.log("THIS IS THE BASE64 RESULT", { data: result });
  };
  console.log(typeof baseString, "BASE 64 YO");

  // let newStopRecording = () => {
  //   stopRecording;
  //   if(status === "stopped") {
  //     getBase64ToBlob();
  //     console.log("base 64 conversion happening. ")
  //   } else { console.log("no base 64 conversion")}
  // }

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
    <div style={{ display: "flex",justifyContent:"center" }}>
      {/* <Box
        border="1px white solid"
        width="800px"
        margin="20px"
        borderRadius="5px"
        padding="20px"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <h1 style={{ fontFamily: "monospace", marginBottom: "20px" }}>
          Video Sampler
        </h1>{" "}
        <Button style={{ margin: "10px" }} small onClick={startRecording}>
          {startRecordingIcon}
        </Button>
        <Button style={{ margin: "10px" }} small onClick={stopRecording}>
          {stopRecordingIcon}
        </Button>
        <video src={mediaBlobUrl} />
      </Box> */}
      <Box
        border="1px white solid"
        width="600px"
        margin="20px"
        borderRadius="5px"
        padding="20px"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <h1 style={{ fontFamily: "monospace" }}>Web Sampler</h1>{" "}
        <div style={{ position: "relative", paddingBottom: "50px" }}>
          <Button
            style={{ position: "absolute", left: 0 }}
            small
            onClick={startRecording}
          >
            {startRecordingIcon}
          </Button>
          <Button
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            small
            onClick={stopRecording}
          >
            {stopRecordingIcon}
          </Button>
          <Button
            onClick={() => {
              console.log("clicked");
              getBase64ToBlob();
            }}
            style={{position: "absolute", right: 0 ,border: "1px solid black",  }}
          >
            CONVERT
          </Button>
          {/* <p>{statusUpdate}</p> */}
          {/* <TransitionsModal baseString={baseString} /> */}
        </div>
        <WaveSurferPlayer
          height={100}
          waveColor="rgb(200, 0, 200)"
          progressColor="rgb(100, 0, 100)"
          url={mediaBlobUrl}
          baseString={baseString}
        />
      </Box>
      <Box>
        {" "}
        <SampleList />
      </Box>
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
