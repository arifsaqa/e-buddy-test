"use client";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteUser, getUsers } from "../../redux/actions/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TableHeader from "../molecules/TableHeader";
import { TableRowItem } from "../molecules/TableRowItem";
import DeleteDialog from "../molecules/DeleteDialog";
import UserFormDialog from "./UserForm";
import { Box, Button, Divider, Typography } from "@mui/material";

const headers = [
  "name",
  "numberOfRents",
  "recentlyActive",
  "totalAverageWeightRatings",
  "Action",
];
const converters = {
  recentlyActive: (seconds: number) => new Date(seconds * 1000).toDateString(),
};

export default function UserTable() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReducer.token);
  const { data, error, loading } = useAppSelector((state) => state.userReducer);
  const [selectedId, setSelectedId] = useState<string | null>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateCreateModal, setUpdateCreateModal] = useState<{
    isUpdate: boolean;
    isOpen: boolean;
  }>({ isOpen: false, isUpdate: false });

  const selectedUser = data.find((v) => v.id === selectedId);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  const handleEdit = (id: string) => {
    setSelectedId(id);
    setUpdateCreateModal({ isOpen: true, isUpdate: true });
  };

  const handleCreate = () => {
    setSelectedId(null);
    setUpdateCreateModal({ isOpen: true, isUpdate: false });
  };

  const handleDeleteConfirm = async () => {
    if (selectedId) {
      await dispatch(deleteUser(selectedId));
    }
    setSelectedId(null);
    setDeleteModal(false);
  };

  React.useEffect(() => {
    if (token) dispatch(getUsers());
  }, [token]);

  return (
    <>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            paddingX: 3,
            paddingY: 2,
          }}
        >
          <Typography variant="h6">User Table</Typography>
          <Button color="primary" variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Box>
        <Divider />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader headers={headers} />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="right" colSpan={4}>
                  Loading
                </TableCell>
              </TableRow>
            ) : (
              data.map((user, idx) => (
                <TableRowItem
                  key={user.name + idx}
                  columns={headers}
                  rowData={user}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  converters={converters}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />

      <UserFormDialog
        isOpen={updateCreateModal.isOpen}
        defaultValue={selectedUser}
        isUpdate={updateCreateModal.isUpdate}
        onClose={() =>
          setUpdateCreateModal((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </>
  );
}
