import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import WaveSurferPlayer from "./WavesurferPlayer";
import DeleteModal from "./DeleteModal";
import WaveSurfer from "wavesurfer.js";

const SampleList = () => {
  const [list, setList] = useState();
  const [baseId, setBaseId] = useState();
  const [soundName, setSoundName] = useState();
  const [urlBlob, setUrlBlob] = useState();
  const handleChange = (e) => {
    let newItem = list.filter((item) => item.value === e.target.value);
    const objMap = newItem.map((item) => item.value);
    const objId = newItem.map((item) => item._id).toString();
    const objName = newItem.map((item) => item.name).toString();
    setBaseId(objId);
    setSoundName(objName);
    const baseKey = Object.values(objMap).toString();
    const byteCharacters = atob(baseKey);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const byteArray = new Uint8Array(byteArrays);
    let newBlob = new Blob([byteArray], { type: "audio/wav" });
    let newBlobUrl = URL.createObjectURL(newBlob);
    setUrlBlob(newBlobUrl);
    console.log(objName, "NAME OF SOUND");
    console.log(baseId, "DELETE ID HERE%^&");
    console.log(objId, "Id HERE$$$");
    console.log(list, "list here!!!");
  };

  // console.log(baseValue);
  useEffect(() => {
    handleListClick();
  }, []);

  const handleListClick = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/record",
    }).then((response) => {
      // console.log(response, "HERE IS GET CALL RESPONSE");
      setList(response.data);
    });
  };

  return (
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
      <Typography
        style={{ fontSize: "30px", paddingTop: "20px", paddingBottom: "20px" }}
      >
        {soundName}
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Sample List</InputLabel>
        <Select
          style={{ width: "200px", marginBottom: "10px" }}
          onChange={handleChange}
          name="category"
          label="Select sample"
        >
          {list?.map((obj) => (
            <MenuItem key={obj._id} value={obj.value}>
              <div>{obj.name}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <audio src={urlBlob} controls /> */}
      <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={urlBlob}
        baseId={baseId}
      />
    </Box>
  );
};

export default SampleList;
