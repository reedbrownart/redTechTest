import Request from "./request";

export default async function createOrder(order: any) {
  const createdOrder: any = await Request(
    "post",
    "https://red-candidate-web.azurewebsites.net/api/Orders",
    order
  );
  return createdOrder
}
