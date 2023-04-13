import { useState, useEffect } from "react";
import fetchOrders from "./helpers/fetchOrders";
import { Grid } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import ActionBar from "./components/ActionBar";
import OrderTable from "./components/OrderTable";

function App() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [orderTypeFilter, setOrderTypeFilter] = useState("none");
  const [toBeDeleted, setToBeDeleted] = useState([""]);
  const [search, setSearch] = useState("");

  async function getData() {
    const orders = await fetchOrders();
    setCurrentOrders(orders);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{ height: "100vh", overflowX: "hidden", width: "100%" }}
    >
      <Header />
      <ActionBar
        setInitialOrderType={setOrderTypeFilter}
        setSearch={setSearch}
        toBeDeleted={toBeDeleted}
        getData={getData}
      />
      <OrderTable
        rows={currentOrders}
        orderTypeFilter={orderTypeFilter}
        search={search}
        setToBeDeleted={setToBeDeleted}
      />
    </Grid>
  );
}

export default App;
