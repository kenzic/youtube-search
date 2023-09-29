import { Alert, Snackbar } from "@mui/material";

const StatusIndictor = ({
  open = false,
  onClose,
  message,
  type = "success",
}) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    action={() => {}}
  >
    <Alert severity={type}>{message}</Alert>
  </Snackbar>
);

export default StatusIndictor;
