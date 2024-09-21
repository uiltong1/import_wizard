import { UserDTO } from "./UserDTO";

export interface PaginatedOrdersDTO {
    users: UserDTO[];
    total: number;
    page: number;
    totalPages: number;
}