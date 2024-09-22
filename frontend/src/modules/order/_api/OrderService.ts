import axios from 'axios';

const API_URL = 'http://localhost:3000/api/orders';

export interface FetchOrdersParams {
    startDate?: string | null;
    endDate?: string | null;
    orderId?: number | null;
    page?: number | null;
    limit?: number | null;
}

interface Product {
    product_id: number | null;
    value: string | null;
}

interface Order {
    order_id: number | null;
    total: string | null;
    date: string | null;
    products: Product[] | null;
}

interface User {
    user_id: number;
    name: string | null;
    orders: Order[] | null;
}

interface FetchOrdersResponse {
    users: User[] | null;
    total: number | null;
    page: number | null;
    totalPages: number | null;
}


export const fetchOrders = async (params: FetchOrdersParams): Promise<FetchOrdersResponse> => {
    const response = await axios.get<FetchOrdersResponse>(API_URL, {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            ...params,
            ...(params.startDate !== null && { startDate: params.startDate }),
            ...(params.endDate !== null && { endDate: params.endDate }),
            ...(params.orderId !== null && { orderId: params.orderId }),
            ...(params.page !== null && { page: params.page }),
            ...(params.limit !== null && { limit: params.limit }),
        },
    });

    return response.data;
};
