import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

interface Row {
  orderId: string;
  createdDate: string;
  createdByUserName: string;
  orderType: string;
  customerName: string;
}

export default function OrderTable(props: {
  rows: Array<Row>;
  orderTypeFilter: string;
  search: string;
  setToBeDeleted: Dispatch<SetStateAction<Array<any>>>;
}) {
  const { rows, orderTypeFilter, search, setToBeDeleted } = props;
  const columns: GridColDef[] = [
    { field: "orderId", headerName: "Order ID", width: 300 },
    { field: "createdDate", headerName: "Creation Date", width: 200 },
    { field: "createdByUserName", headerName: "Created By", width: 200 },
    { field: "orderType", headerName: "Order Type", width: 150 },
    { field: "customerName", headerName: "Customer", width: 200 },
  ];

  const [localRows, setLocalRows] = useState(rows);

  useEffect(() => {
    setLocalRows(rows);
  }, [rows]);

  useEffect(() => {
    if (orderTypeFilter === "none") {
      setLocalRows(rows);
      return;
    }
    if (orderTypeFilter.length > 0) {
      setLocalRows(rows.filter((row) => row.orderType === orderTypeFilter));
    }
  }, [orderTypeFilter, rows]);

  useEffect(() => {
    if (search.length > 0) {
      setLocalRows(rows.filter((row) => row.customerName.toUpperCase().startsWith(search.toUpperCase())))
    }
  }, [search, rows]);

  return (
    <Grid container style={{ height: "calc(100% - 155px)", width: "100%" }}>
      <DataGrid
        getRowId={(row: any) => row.orderId}
        rows={localRows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(selections) => setToBeDeleted(selections)}
      />
    </Grid>
  );
}
