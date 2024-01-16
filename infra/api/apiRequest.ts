import { APIRequestContext, request } from "playwright"

export const postRequest = async (url: string, body: any,availableRequest?: APIRequestContext, headers?: Record<string, string>) => {
    let newRequest: APIRequestContext
    const requestOptions: Record<string, any> = {
        data: body,
    };
    if (headers) {
        requestOptions.headers = headers;
    }
    if (availableRequest) {
        return await availableRequest.post(url, requestOptions);
    }
    newRequest = await request.newContext();
    return await newRequest.post(url, requestOptions)
};