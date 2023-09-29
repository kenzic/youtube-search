import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function AddVideoDialog({ onError, onSuccess }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();

    setOpen(false);
    setInputValue("");

    try {
      const response = await fetch("/api/add", {
        method: "POST",
        body: JSON.stringify({ url: inputValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      onSuccess(data);
    } catch (e) {
      onError(e.message);
    }
  };

  return (
    <div>
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Video</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleAddVideo}>
          <DialogContent>
            <DialogContentText>
              Paste YouTube link here to add video to your list.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="youtubeurl"
              label="YouTube URL"
              type="url"
              fullWidth
              variant="standard"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="warning">
              Cancel
            </Button>
            <Button onClick={handleAddVideo} variant="outlined" color="success">
              Add Video
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
