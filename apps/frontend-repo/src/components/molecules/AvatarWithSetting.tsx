"use client";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { signin, signout } from "../../redux/actions/auth";
import { authStateChange, signOut } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";

const AvatarWithSetting = () => {
    const router = useRouter()
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await signOut();
    await dispatch(signout());
    router.refresh();
  };

  React.useEffect(() => {
    const unsub = authStateChange((user, token) => {
      const { uid, providerId, displayName, email, photoURL, phoneNumber } =
        user;
      dispatch(
        signin({
          token,
          user: {
            uid,
            providerId,
            displayName,
            email,
            photoURL,
            phoneNumber,
          },
        })
      );
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user?.displayName as string}
            src={user?.photoURL as string}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Typography sx={{ textAlign: "center" }}>
            {user?.displayName}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ textAlign: "center" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarWithSetting;
