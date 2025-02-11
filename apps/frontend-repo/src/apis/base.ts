import { HTTP_METHOD } from "next/dist/server/web/http";

interface BaseApiProps {
  url: string;
  method: HTTP_METHOD;
  token: string;
}

const baseApi = (props: BaseApiProps) => {
  return (body: BodyInit | null | undefined) =>
    fetch(props.url, {
      body,
      method: props.method,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
};
