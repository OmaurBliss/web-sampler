import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TransitionsModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const blobUrl = props.blobUrl;
  const [form, setForm] = useState({
    name: "",
    value: blobUrl,
    category: "",
  });
  const newRecord = { ...form };
  // const newSample = JSON.stringify(newRecord);

  console.log("props child YO", props);
  // const methods = useForm();
  // const onSubmit = (data) => console.log(data);

  //   const payload = {
  //     name: data.name,
  //     value: data.value,
  //     category: data.category,
  //   }

  const saveOnSubmit = () => {
    let payload = blobUrl;
    //   axios
    //     .post("http://localhost:5000/record",{
    //   name: "patty",
    //   value: "value",
    //   category: "misc",

    //     })
    //     .then((res) => console.log(res, "THIS IS THE RESPONSE"))
    //     .catch(alert("error in process"))
    //     .finally(
    //       setForm({
    //         name: "",
    //         value: payload,
    //         category: "",
    //       })
    //     );

    axios({
      method: "post",
      url: "http://localhost:5000/record",
      data: {
        name: "Tito sings",
        value: payload,
        category: "vocal",
      },
    }).then((res) => console.log(res));
  };

  const SelectCategory = () => {
    const categories = [
      {
        value: "drums",
        label: "Drum samples",
      },
      {
        value: "voice",
        label: "Voice samples",
      },
      {
        value: "instrument",
        label: "Instrument samples",
      },
      {
        value: "misc",
        label: "Misc samples",
      },
    ];

    return (
      <div style={{ margin: "10px" }}>
        <TextField
          select
          label="Select Category"
          defaultValue="misc"
          helperText="Please select category"
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  };

  return (
    // <FormProvider {...methods}>
    //   <form>
    <div>
      <Button disabled={!blobUrl} onClick={handleOpen}>
        <SaveIcon style={{ color: !blobUrl ? "grey" : "black" }} />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Save Sample
            </Typography>
            <TextField autoComplete="off" type="text" label="Sample name" />
            <SelectCategory />
            <Button onClick={saveOnSubmit}>
              <Typography>Save Sample</Typography>
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
    // </form>
    // </FormProvider>
  );
};

export default TransitionsModal;
