export class PaginationResponse<T> {
    public data: T[];
    public currentPage: number;
    public totalPages: number;
    public totalCount: number;
    public pageSize: number;
    public hasPreviousPage: boolean;
    public hasNextPage: boolean;

    constructor(data: T[], count: number, page: number, pageSize: number) {
        this.data = data;
        this.currentPage = page;
        this.pageSize = pageSize;
        this.totalPages = Math.ceil(count / pageSize);
        this.totalCount = count;
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage < this.totalPages;
    }
}
