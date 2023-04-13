import Request from './request';

export default async function fetchOrders() {
  const { data }: any = await Request(
    "get",
    "https://red-candidate-web.azurewebsites.net/api/Orders",
    {}
  );
  return data;
}
