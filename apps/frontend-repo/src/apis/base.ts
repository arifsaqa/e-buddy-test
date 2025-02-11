import { HTTP_METHOD } from "next/dist/server/web/http";

interface FetchOptions {
  body?: any;
  json?: Record<string, any>;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  isPrivate?: boolean;
  token?: string;
  manualUrl?: boolean;
  blob?: boolean;
}
interface MakeRequestArgs extends FetchOptions {
  url: string;
  method?: HTTP_METHOD;
}
export class BaseApi {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  private getUrl(
    params?: Record<string, string>,
    path?: string,
    manualUrl?: boolean
  ) {
    const search = params ? new URLSearchParams(params).toString() : "";
    return manualUrl ? path! : this.baseUrl + path! + "?" + search;
  }

  private async handleResponse(
    resp: Response,
    method?: HTTP_METHOD,
    blob?: any
  ) {
    if (resp?.statusText === "No Content") {
      return {};
    }

    const jsonBody = blob ? await resp?.blob() : await resp?.json();

    let responseBody = blob ? jsonBody : { ...jsonBody };

    if (method !== "GET") {
      if (!resp?.ok) return Promise.reject(new Error(JSON.stringify(jsonBody)));
    }

    if (Array.isArray(jsonBody)) {
      responseBody = [...jsonBody];
    }

    return Promise.resolve(responseBody);
  }

  private async handleNetworkError(err: any) {
    if (err.name === "TypeError" && err.message === "Failed to fetch") {
      console.error("failed to get proper response from api server", err);
    }

    if (
      typeof err.json === "function" ||
      typeof err?.response?.json === "function"
    ) {
      const data = await err.json();
      err.response = { data };
    }

    return Promise.reject(new Error(err.message || err));
  }

  private async makeFetchRequest({
    url,
    method,
    body,
    headers,
    blob,
  }: Omit<MakeRequestArgs, "json" | "params">) {
    try {
      const resp = await fetch(url, {
        method,
        headers: {
          ...(body && { "Content-Type": "application/json" }),
          Accept: "application/json",
          // "api-key": process.env.NEXT_PUBLIC_API_KEY,
          ...headers,
        },
        body: body ?? (typeof body === "string" ? body : null),
      });

      return await this.handleResponse(resp, method, blob);
    } catch (err) {
      return await this.handleNetworkError(err);
    }
  }

  fetch = async <T>(
    path = "/",
    method: HTTP_METHOD = "GET",
    fetchOptions?: FetchOptions
  ): Promise<T> => {
    let {
      body,
      json,
      params,
      headers,
      isPrivate = false,
      token = undefined,
      manualUrl = false,
      blob = false,
    } = fetchOptions!;

    const url = this.getUrl(params, path, manualUrl);
    console.log({ url });

    if (isPrivate) {
      headers = {
        ...headers,
        Authorization: "Bearer " + token,
      };
    }

    let bodyResult: any;
    if (body) bodyResult = body;
    else bodyResult = json ? JSON.stringify(json) : null;

    return await this.makeFetchRequest({
      url,
      method,
      body: bodyResult,
      headers,
      blob,
    });
  };
}
