import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
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
  const [urlBlob, setUrlBlob] = useState();
  const handleChange = (e) => {
    let newItem = list.filter((item) => item.value === e.target.value);
    const objMap = newItem.map((item) => item.value);
    const objId = newItem.map((item) => item._id).toString();
    setBaseId(objId);
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
    console.log(baseId, "DELETE ID HERE%^&")
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

  // const deleteListItem = (e) => {
  //   axios({
  //     method: "delete",
  //     url: `http://localhost:5000/record/${baseId}`,
  //   })
  //     .then((response) => {
  //       console.log(response, "deleted");
  //     })
  //     .catch((e) => console.log("error in deleting item"));
  // };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Sample List</InputLabel>
        <Select
          // value={baseValue}
          onChange={handleChange}
          onMouseDown={(event) => {
            event.stopPropagation();
           }}
          //   onClick={wavesurferClick}
          name="category"
          label="Select sample"
          //   defaultValue="misc"
        >
          {list?.map((obj) => (
            <MenuItem key={obj._id} value={obj.value}>
              <div>{obj.name}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <audio src={urlBlob} controls />
      <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={urlBlob}
        baseId={baseId}
      />
      
      {/* <SamplePlayer /> */}
    </div>
  );
};

export default SampleList;
