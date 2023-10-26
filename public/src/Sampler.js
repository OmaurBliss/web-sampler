import React, { useState } from "react";
import * as Tone from "tone";
import { Box, Slider, Typography } from "@material-ui/core";


const Sampler = (url) => {
  const [value, setValue] = useState(20);
  const [endValue, setEndValue] = useState(20);


  const changeValue = (event, value) => {
    setValue(value);
  };
  const changeEndValue = (event, endValue) => {
    setEndValue(endValue);
  };
  let loopStart = value * 0.1;
  let loopEnd = endValue * 0.1;

const player = new Tone.Player(url).toDestination();
  console.log(url, "fired");
  player.autostart = false;

  const handlePlayerClick = () => {
    player.start();

  };
  console.log(player);

  const handleSampleLoopPlayerClick = () => {
    if (loopStart >= loopEnd) {
      alert("Loop Ending must be more than loop beginning");
    } else {
      player.setLoopPoints(loopStart, loopEnd);
      player.loop = true;
      player.start()
      console.log(player)
      
    }
  };

  const handleSamplePlayerStop = () => {
    player.stop();
  };

  return (
    <Box margin="20px" border=" 1px solid black" padding="20px">
      <button onClick={() => handlePlayerClick()}> Play Sample</button>
      <button onClick={() => handleSamplePlayerStop()}> Stop Sample</button>
      <Box margin="20px" border=" 1px solid black" padding="20px">
        <button onClick={() => handleSampleLoopPlayerClick()}>
          {" "}
          Play Loop Sample
        </button>
        <button onClick={() => handleSamplePlayerStop()}>
          {" "}
          Stop Loop Sample
        </button>
        <Box display="flex" flexDirection="column" m={10}>
          <Typography>
            Loop Start
            <Slider
              style={{ width: 1000 }}
              min={10}
              max={100}
              step={10}
              value={value}
              marks
              onChange={changeValue}
            />
          </Typography>
          <Typography>
            Loop End
            <Slider
              style={{ width: 1000 }}
              min={10}
              max={100}
              step={10}
              value={endValue}
              marks
              onChange={changeEndValue}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sampler;
