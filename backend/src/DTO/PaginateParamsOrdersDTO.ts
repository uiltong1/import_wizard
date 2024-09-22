export interface PaginateParamsOrdersDTO {
    orderId?: number;
    startDate?: Date;
    endDate?: Date;
    page: number;
    limit: number;
}