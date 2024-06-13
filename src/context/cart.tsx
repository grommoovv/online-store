'use client'
import { Cart, CartProduct, OrderProduct, Product } from '@/domain'
import { LOCAL_STORAGE_KEYS } from '@/lib/constants'
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface CartContext {
  cart: Cart
  toggleProduct: (product: Product) => void
  getCount: () => number
  getAmount: () => number
  inc: (productId: number) => void
  dec: (productId: number) => void
  getOrderProducts: () => OrderProduct[]
}

const CartContext = createContext<CartContext>({} as CartContext)

export const useCartContext = () => {
  const ctx = useContext(CartContext)

  if (!ctx) {
    throw new Error('useCartContext must be used within a CartContextProvider')
  }

  return ctx
}

const getCount = (products: CartProduct[]): number => {
  return products.reduce((total, product) => total + product.quantity, 0)
}

const getAmount = (products: CartProduct[]): number => {
  return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
}

const getInitialCart = (): Cart => {
  if (typeof window !== 'undefined') {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEYS.CART)
    const initialCart = storage
      ? JSON.parse(storage)
      : {
          products: [],
          count: 0,
          amount: 0,
          updated_at: new Date(Date.now()),
        }

    initialCart.count = getCount(initialCart.products)
    initialCart.amount = getAmount(initialCart.products)
    return initialCart
  }

  return {
    products: [],
    count: 0,
    amount: 0,
    updated_at: new Date(Date.now()),
  }
}

export const CartContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(getInitialCart)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart))
    }
  }, [cart])

  const toggleProduct = (product: Product) => {
    const newItem: CartProduct = {
      ...product,
      quantity: 1,
    }

    const existingProductIndex = cart.products.findIndex((i) => i.id === newItem.id)
    let newProducts

    if (existingProductIndex !== -1) {
      newProducts = cart.products.filter((el) => el.id !== newItem.id)
      toast.warning(`Убрано из корзины`, {
        description: product.title,
      })
    } else {
      newProducts = [...cart.products, newItem]
      toast.success(`Добавлено в корзину`, {
        description: product.title,
      })
    }

    const updatedCart = {
      ...cart,
      products: newProducts,
      count: getCount(newProducts),
      amount: getAmount(newProducts),
      updated_at: new Date(Date.now()),
    }

    setCart(updatedCart)
  }

  const inc = (productId: number) => {
    const newCart = cart.products.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
    const updatedCart = {
      ...cart,
      products: newCart,
      count: getCount(newCart),
      amount: getAmount(newCart),
      updated_at: new Date(Date.now()),
    }
    setCart(updatedCart)
  }

  const dec = (productId: number) => {
    const newCart = cart.products.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    )
    const updatedCart = {
      ...cart,
      products: newCart,
      count: getCount(newCart),
      amount: getAmount(newCart),
      updated_at: new Date(Date.now()),
    }
    setCart(updatedCart)
  }

  const getOrderProducts = (): OrderProduct[] => {
    return cart.products.map((product) => ({
      product_id: product.id,
      product_quantity: product.quantity,
    }))
  }

  const value: CartContext = {
    cart,
    toggleProduct,
    getCount: () => getCount(cart.products),
    getAmount: () => getAmount(cart.products),
    inc,
    dec,
    getOrderProducts,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
