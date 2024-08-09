import { IErrorResponseData, IResponseData } from "../response/response";

export function formatResponse<T>(data: T, message: string, errors: IErrorResponseData[] = [], statusCode: number = 200): IResponseData<T> {
    return {
        data,
        errors,
        message,
        statusCode,
        messages: [],
        exception: '',
        errorId: '',
        status: statusCode,
    };
}
