export interface IResponseData<T> {
    data?: T,
    errors: IErrorResponseData[];
    message: string,
    statusCode: number,
    messages: T[],
    exception: string,
    errorId: string,
    status?: number;
}

export interface IPaginator<T> {
    data: T,
    currentPage: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalCount: number;
    totalPages: number;
}

export interface IErrorResponseData {
    propertyName: string,
    errorMessage: string;
}
