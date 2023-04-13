import Request from "./request";

export default async function deleteOrders(orders: Array<any>) {
  await Request(
    "post",
    "https://red-candidate-web.azurewebsites.net/api/Orders/Delete",
    orders
  );
  return "Successfully deleted orders";
}
