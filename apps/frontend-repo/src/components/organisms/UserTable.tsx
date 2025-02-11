"use client";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUsers } from "../../redux/actions/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import TableHeader from "../molecules/TableHeader";
import { TableRowItem } from "../molecules/TableRowItem";

const headers = [
  "name",
  "numberOfRents",
  "recentlyActive",
  "totalAverageWeightRatings",
  "Action",
];

export default function UserTable() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authReducer.token);
  const { data, error, loading } = useAppSelector((state) => state.userReducer);
  const handleDelete = (id: string) => {};
  const handleEdit = (id: string) => {};

  React.useEffect(() => {
    if (token) dispatch(getUsers());
  }, [token]);

  return (
    <TableContainer component={Paper}>
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
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
