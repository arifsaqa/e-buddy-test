import * as React from "react";
import { Dialog as MuiDialog } from "@mui/material";

export default function Dialog({
  children,
  isOpen,
}: {
  readonly isOpen: boolean;
  readonly children: React.ReactNode;
}) {
  return (
    <MuiDialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      {children}
    </MuiDialog>
  );
}
