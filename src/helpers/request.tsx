import axios from "axios";

export default async function Request(method: string, url: string, data: any) {
  const options = {
    method,
    data,
    url,
    headers: {
      ApiKey: "b7b77702-b4ec-4960-b3f7-7d40e44cf5f4",
    },
  };

  try {
    const resp = await axios(options);

    return resp;
  } catch (err) {
    console.error(err);
  }
}
