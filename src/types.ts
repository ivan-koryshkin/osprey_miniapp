export interface UserData {
    id: string
}

export interface AccountData {
    id: string
    name: string
    description: string
}

export interface ProductData {
    id: string
    name: string
    description: string
    price: string
}

export interface CategoryData {
    id: string
    name: string
    description: string
}

export interface CartItem {
    productId: string
    name: string
    count: number
}