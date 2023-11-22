import React, { useState } from "react";
import axios from "axios";



const SampleList = () => {
    // const [list, setList] = useState();

    const handleListClick =()=>{
        axios({
            method: "get",
            url: "http://localhost:5000/record",
        }).then((response)=> console.log(response))

    };
    


    
  return (
    <button onClick={handleListClick}>SampleList</button>
  )
}

export default SampleList