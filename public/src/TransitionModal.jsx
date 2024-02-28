import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";

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
  const [propState, setPropState] = useState();
  const [blobState, setBlobState] = useState();
  const [textValue, setTextValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleChange = (e) => setCategoryValue(e.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, reset, control } = useForm(); // retrieve all hook methods
  const baseData = props.baseString;
  const blobUrl = props.blobUrl;

  console.log(typeof baseData, "THIS BASE DATA PROPS YO!!!!");
  console.log(blobUrl, "THIS is transiiton modal PROPS YO!!!!");

  const saveOnSubmit = async () => {
    let payload = {
      name: textValue,
      value: baseData,
      category: categoryValue,
    };
    return axios({
      method: "post",
      url: "http://localhost:5000/record",
      data: payload,
    }).then((res) => {
      console.log(res, "this is saved response");
    });
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
        <FormControl fullWidth>
          <InputLabel>Sample Type</InputLabel>
          <Select
            value={categoryValue}
            onChange={handleChange}
            name="category"
            label="Select Category"
            // defaultValue="value"
            // helperText="Please select category"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <div>
      <Button disabled={!props} onClick={handleOpen}>
        <SaveIcon style={{ color: !props ? "grey" : "black" }} />
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
            <FormProvider>
              <form onSubmit={handleSubmit(saveOnSubmit)}>
                <TextField
                  onChange={onTextChange}
                  value={textValue}
                  label="Sample name"
                />
                <SelectCategory />
                <Button type="submit">
                  <Typography>Save Sample</Typography>
                </Button>
              </form>
            </FormProvider>
          </Box>
        </Fade>
      </Modal>
    </div>
    //{" "}
  );
};

export default TransitionsModal;
