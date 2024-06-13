export interface Product {
  id: number
  title: string
  description: string
  price: number
  image_url: string
  category: string
}

export interface CartProduct extends Product {
  quantity: number
}

export interface Cart {
  products: CartProduct[]
  count: number
  amount: number
  updated_at: Date | null
}

export interface OrderProduct {
  product_id: number
  product_quantity: number
}

export interface Order {
  firstName: string
  lastName: string
  patronymic: string
  phoneNumber: string
  email: string
  deliveryAddress: string
  products: OrderProduct[]
}
