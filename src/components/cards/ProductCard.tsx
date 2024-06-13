'use client'
import { useCartContext } from '@/context/cart'
import { Product } from '@/domain'
import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren, ReactNode, createContext, useContext } from 'react'
import { Button } from '../ui/button'
import { MinusIcon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'

interface ProductCardContext {
  product: Product
}

const ProductCardContext = createContext<ProductCardContext>({} as ProductCardContext)

const useProductCardContext = () => {
  const ctx = useContext(ProductCardContext)

  if (!ctx) {
    throw new Error('useProductCardContext must be used within a ProducCard')
  }

  return ctx
}

interface ProductCardProps {
  product: Product
  children: ReactNode
}

const ProductCard: FC<ProductCardProps> = ({ product, children }) => {
  return (
    <ProductCardContext.Provider value={{ product }}>
      <div className='relative w-full pb-[100%] bg-zinc-100 rounded-[1px]'>
        <div className='absolute top-0 left-0 w-full h-full p-3'>{children}</div>
      </div>
    </ProductCardContext.Provider>
  )
}

const ProductCardLink: FC<PropsWithChildren> = ({ children }) => {
  const { product } = useProductCardContext()
  return <Link href={`/catalog/${product.id}`}>{children}</Link>
}

const ProductCardTitle: FC = () => {
  const { product } = useProductCardContext()
  return <h2 className='product-card-title'>{product.title}</h2>
}

const ProductCardCategory: FC = () => {
  const { product } = useProductCardContext()
  return <div className='text-secondary'>{product.category}</div>
}

const ProductCardImage: FC = () => {
  const { product } = useProductCardContext()
  return (
    <div className='flex h-full justify-center items-center'>
      <Image
        className=''
        src={product.image_url}
        width={250}
        height={250}
        alt={product.title}
        priority={false}
      />
    </div>
  )
}

const ProductCardDescription: FC = () => {
  const { product } = useProductCardContext()
  return <div>{product.description}</div>
}

const ProductCardAddToCard: FC = () => {
  const { product } = useProductCardContext()
  const { toggleProduct, cart } = useCartContext()

  const inCart = product && cart ? cart.products.some((i: Product) => i.id === product.id) : null

  const displayIcon = inCart ? <MinusIcon /> : <PlusIcon />

  return (
    <Button
      className='absolute bottom-3 right-3 z-50 rounded-full'
      variant='outline'
      onClick={() => toggleProduct(product)}
      size='sm'
    >
      {displayIcon}
    </Button>
  )
}

interface ProductCardCounterProps {
  productId: number
}

const ProductCardCounter: FC<ProductCardCounterProps> = ({ productId }) => {
  const { cart, inc, dec } = useCartContext()
  return (
    <div className='bg-zinc-800 h-[30px] absolute bottom-3 left-3 flex text-zinc-50 rounded-full'>
      <button
        className='flex items-center justify-center w-[30px] text-white rounded-full bg-zinc-800 transition duration-300 disabled:cursor-auto disabled:opacity-20'
        disabled={cart.products[productId - 1]?.quantity === 1}
        onClick={() => dec(productId)}
      >
        <MinusIcon />
      </button>
      <div className='flex items-center justify-center w-[30px] font-medium'>
        {cart.products[productId - 1]?.quantity}
      </div>
      <button
        className='flex items-center justify-center w-[30px] text-white rounded-full bg-zinc-800 transition duration-300'
        onClick={() => inc(productId)}
      >
        <PlusIcon />
      </button>
    </div>
  )
}

export {
  ProductCard,
  ProductCardLink,
  ProductCardTitle,
  ProductCardCategory,
  ProductCardImage,
  ProductCardDescription,
  ProductCardAddToCard,
  ProductCardCounter,
}
