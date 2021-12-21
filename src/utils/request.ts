import { apiAxios, setAuth } from "./axios";

interface RequestMeta {
  method: "get" | "post" | "put" | "delete";
  url: string;
  headers?: {};
};

interface RequestMetaBody extends RequestMeta {
  body: {}
}

interface ResponseData {
  result: boolean;
  data: any;
  message: null | undefined | string;
}

export const requestAxiosQuery = async ({ method = "get", url, headers = {} }: RequestMeta): Promise<ResponseData> => {
  let result: ResponseData = {
    result: false,
    data: null,
    message: null
  };

  try {
    const { data } = await apiAxios[method](url, headers);

    if (!data.result) {
      // eslint-disable-next-line no-throw-literal
      throw { message: data.message };
    }

    if (data.access) {
      setAuth(data.access);
    }

    result = { ...data };
  } catch (err: any) {
    console.error(err.message, "API Query Request Failed");
    result.message = err.message;
  } finally {
    return result;
  }
};

export const requestAxiosBody = async ({ method = "get", url, body = {}, headers = {} }: RequestMetaBody): Promise<ResponseData> => {
  let result: ResponseData = {
    result: false,
    data: null,
    message: null
  };

  try {
    const { data } = await apiAxios[method](url, body, headers);

    if (!data.result) {
      // eslint-disable-next-line no-throw-literal
      throw { message: data.message };
    }

    result = { ...data };
  } catch (err: any) {
    console.error(err.message, "API Body Request Failed");
    result.message = err.message;
  } finally {
    return result;
  }
};