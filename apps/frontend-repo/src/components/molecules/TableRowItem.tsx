import { TableRow, TableCell, Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface TableRowItemProps {
  rowData: Record<string, any>;
  columns: string[];
  converters: Record<string, Function>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TableRowItem = ({
  rowData,
  columns,
  onDelete,
  onEdit,
  converters,
}: TableRowItemProps) => {
  return (
    <TableRow>
      {columns
        .filter((v) => v.toLowerCase() !== "action")
        .map((column) => (
          <TableCell key={column}>
            {typeof converters[column] === "function"
              ? converters[column](rowData[column])
              : rowData[column]}
          </TableCell>
        ))}
      <TableCell>
        <Button
          color="primary"
          type="button"
          onClick={() => onEdit(rowData["id"])}
        >
          Edit
        </Button>
        <Button
          color="error"
          type="button"
          onClick={() => onDelete(rowData["id"])}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
