import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
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

export default function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const baseId = props.baseId || null;

  const deleteListItem = () => {
    axios({
      method: "delete",
      url: `http://localhost:5000/record/${baseId}`,
    })
      .then((response) => {
        console.log(response, "deleted");
      })
      .catch((e) => console.log(e, "error in deleting item"))
      .finally(handleClose());
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <ClearIcon style={{ color: "red" }} />
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this sound?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deleting is final.
          </Typography>
          <span>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteListItem}>Delete</Button>
          </span>
        </Box>
      </Modal>
    </div>
  );
}
