import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "../atoms/Dialog";
import { useAppDispatch } from "../../redux/hooks";
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import InputWithLabel from "../molecules/InputWithLabel";
import { User } from "@repo/entities";
import { createUser, udpateUser } from "../../redux/actions/users";

interface UserForm {
  isUpdate: boolean;
  isOpen: boolean;
  onClose: VoidFunction;
  defaultValue?: User;
}

export default function UserFormDialog({
  isOpen,
  onClose,
  isUpdate,
  defaultValue,
}: Readonly<UserForm>) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<
    Record<string, { message: string; isError: boolean }>
  >({});

  console.log(
    errors,
    Object.values(errors).some((error) => !!error?.isError)
  );

  const validateInputs = () => {
    const form = document.getElementById("userForm") as HTMLFormElement;
    const data = new FormData(form);

    let isValid = true;
    const name = data.get("name") as string;
    const numberOfRents = data.get("numberOfRents") as string;
    const totalAverageWeightRatings = data.get("numberOfRents") as string;

    if (!name || name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        ["name"]: {
          isError: true,
          message: "Name must be at least 3 characters long ",
        },
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        ["name"]: { isError: false, message: "" },
      }));
    }

    if (isNaN(Number(numberOfRents))) {
      setErrors((prev) => ({
        ...prev,
        ["numberOfRents"]: {
          isError: true,
          message: "numberOfRents should be a number",
        },
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        ["numberOfRents"]: { isError: false, message: "" },
      }));
    }

    if (isNaN(Number(totalAverageWeightRatings))) {
      setErrors((prev) => ({
        ...prev,
        ["totalAverageWeightRatings"]: {
          isError: true,
          message: "totalAverageWeightRatings should be a number",
        },
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({
        ...prev,
        ["totalAverageWeightRatings"]: { isError: false, message: "" },
      }));
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(
      "submiting",
      Object.values(errors).some((error) => !!error?.isError)
    );

    if (Object.values(errors).some((error) => !!error?.isError)) return;

    const name = data.get("name") as string;
    const numberOfRents = data.get("numberOfRents") as string;
    const totalAverageWeightRatings = data.get("numberOfRents") as string;
    const payload = {
      name,
      numberOfRents: Number(numberOfRents),
      totalAverageWeightRatings: Number(totalAverageWeightRatings),
    };
    setLoading(true);

    await (isUpdate
      ? dispatch(
          udpateUser({
            id: defaultValue?.id!,
            ...payload,
          })
        )
      : dispatch(createUser(payload)));

    setLoading(false);
  };

  return (
    <Dialog isOpen={isOpen}>
      <DialogTitle>
        {isUpdate ? "Update" : "Create"}
        {" User"}
      </DialogTitle>
      <Box id="userForm" component="form" onSubmit={handleSubmit} noValidate>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          {["name", "numberOfRents", "totalAverageWeightRatings"].map(
            (inputName) => {
              const value = defaultValue
                ? (defaultValue as any)[inputName]
                : "";
              return (
                <InputWithLabel
                  key={inputName}
                  label={inputName}
                  isError={errors[inputName]?.isError}
                  errorMessage={errors[inputName]?.message}
                  placeholder="a@gmail.com"
                  defaultValue={value}
                />
              );
            }
          )}

          <Collapse in={!!formError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setFormError(null);
                  }}
                >
                  X
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {formError}
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            disabled={loading}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
