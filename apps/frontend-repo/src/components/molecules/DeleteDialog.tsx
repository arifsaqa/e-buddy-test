import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "../atoms/Dialog";

export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}>) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setIsLoading(false);
    await onConfirm();
    setIsLoading(false);
  };
  return (
    <Dialog
      isOpen={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Data</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete the data?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus disabled={isLoading}>
          {isLoading ? "Loading..." : "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
