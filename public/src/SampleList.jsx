import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const SampleList = () => {
  const [list, setList] = useState();
  const [nameValue, setNameValue] = useState("");
  const [blobValue, setBlobValue] = useState("");
  const handleChange = (e) => setBlobValue(e.target.value);

  useEffect(() => {
    handleListClick();
  }, []);

    const handleListClick = () => {
      axios({
        method: "get",
        url: "http://localhost:5000/record",
      }).then((response) => {
        // let nameList = response.data;
        setList(response.data);
        
        // let objArray = nameList.map((obj)=> console.log(obj))
      });
    };
  console.log(list, "This Is Your List Call YO");
  console.log(blobValue);




    return (
      <FormControl fullWidth>
        <InputLabel>Sample List</InputLabel>
        <Select
          value={blobValue}
          onChange={handleChange}
          name="category"
          label="Select sample"
          defaultValue="misc"
        >

           {list?.map((obj)=>(<MenuItem key={obj._id} value={obj.value}>{obj.name}</MenuItem>))}

        </Select>
      </FormControl>
    );

};

export default SampleList;
