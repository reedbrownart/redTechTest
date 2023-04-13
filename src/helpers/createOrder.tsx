import Request from "./request";

interface Order {
  createdByUserName: string;
  orderType: string;
  customerName: string;
}

export default async function createOrder(order: Order) {
  const createdOrder = await Request(
    "post",
    "https://red-candidate-web.azurewebsites.net/api/Orders",
    order
  );
  return createdOrder
}
