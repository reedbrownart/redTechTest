import { Dispatch, SetStateAction, useState, useEffect } from "react";
import deleteOrders from "../../helpers/deleteOrders";
import createOrder from "../../helpers/createOrder";

import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionBar(props: {
  setInitialOrderType: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  getData: Function;
  toBeDeleted: Array<any>;
}) {
  const { setInitialOrderType, setSearch, getData, toBeDeleted } = props;

  const [orderType, setOrderType] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    orderType: "",
    createdByUserName: "",
    customerName: "",
  });
  const [formComplete, setFormComplete] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as string);
  };

  async function confirmDeleteOrders() {
    await deleteOrders(toBeDeleted);
    getData();
    setDeleteDialogOpen(false);
  }

  async function postOrder() {
    await createOrder(newOrder);
    getData();
    setCreateDialogOpen(false);
  }

  useEffect(() => {
    setInitialOrderType(orderType);
  }, [orderType, setInitialOrderType]);

  useEffect(() => {
    setFormComplete(
      !(
        newOrder.createdByUserName !== "" &&
        newOrder.customerName !== "" &&
        newOrder.orderType !== ""
      )
    );
  }, [newOrder]);

  return (
    <Grid
      container
      flexDirection="row"
      wrap="nowrap"
      sx={{ padding: "10px", overflowX: "scroll" }}
    >
      <TextField
        label="Search by ID..."
        sx={{ minWidth: "200px", marginRight: "10px" }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginRight: "10px", minWidth: "175px" }}
        onClick={() => setCreateDialogOpen(true)}
      >
        CREATE ORDER
      </Button>
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create Order</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
            <Grid item xs={12}>
              <TextField
                label="Created By"
                fullWidth
                onChange={(e) =>
                  setNewOrder({ ...newOrder, createdByUserName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Customer"
                fullWidth
                onChange={(e) =>
                  setNewOrder({ ...newOrder, customerName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Order Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newOrder.orderType}
                  label="Order Type"
                  onChange={(e) => setNewOrder({ ...newOrder, orderType: e.target.value })}
                >
                  <MenuItem value={"Standard"}>Standard</MenuItem>
                  <MenuItem value={"ReturnOrder"}>ReturnOrder</MenuItem>
                  <MenuItem value={"TransferOrder"}>TransferOrder</MenuItem>
                  <MenuItem value={"SaleOrder"}>SaleOrder</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <Button onClick={postOrder} disabled={formComplete}>
          Confirm
        </Button>
      </Dialog>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        sx={{ marginRight: "10px", minWidth: "200px" }}
        onClick={() => setDeleteDialogOpen(true)}
      >
        DELETE SELECTED
      </Button>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          Deleting an order is permanent, and can not be recovered.
        </DialogContent>
        <Button onClick={confirmDeleteOrders}>Confirm</Button>
      </Dialog>
      <Box sx={{ minWidth: "125px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderType}
            label="Order Type"
            onChange={handleChange}
          >
            <MenuItem value={"none"}>All Orders</MenuItem>
            <MenuItem value={"Standard"}>Standard</MenuItem>
            <MenuItem value={"ReturnOrder"}>ReturnOrder</MenuItem>
            <MenuItem value={"TransferOrder"}>TransferOrder</MenuItem>
            <MenuItem value={"SaleOrder"}>SaleOrder</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Grid>
  );
}
