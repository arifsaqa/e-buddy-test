import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableHeader = ({ headers }: { headers: string[] }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header}>{header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
