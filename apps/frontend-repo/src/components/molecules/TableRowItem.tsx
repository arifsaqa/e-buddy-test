import { TableRow, TableCell, Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface TableRowItemProps {
  rowData: Record<string, any>;
  columns: string[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TableRowItem = ({
  rowData,
  columns,
  onDelete,
  onEdit,
}: TableRowItemProps) => {
  return (
    <TableRow>
      {columns
        .filter((v) => v.toLowerCase() !== "action")
        .map((column) => (
          <TableCell key={column}>{rowData[column]}</TableCell>
        ))}
      <TableCell>
        <Button color="primary" onClick={() => onDelete(rowData["id"])}>
          Edit
        </Button>
        <Button color="error" onClick={() => onEdit(rowData["id"])}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
