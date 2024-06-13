'use client'

import {
  ProductCard,
  ProductCardAddToCard,
  ProductCardCategory,
  ProductCardCounter,
  ProductCardImage,
  ProductCardTitle,
} from '@/components/cards/ProductCard'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/context/cart'
import Link from 'next/link'

export default function CartPage() {
  const { cart } = useCartContext()
  return (
    <section>
      {cart.products.length > 0 ? (
        <>
          <CartList />
          <Summary />
        </>
      ) : (
        <div className='text-secondary text-center'>Вы еще не добавили товар в корзину</div>
      )}
    </section>
  )
}

function CartList() {
  const { cart } = useCartContext()

  return (
    <div className='grid grid-cols-4 gap-3'>
      {cart.products.map((product) => (
        <ProductCard product={product} key={product.id}>
          <ProductCardCategory />
          <ProductCardTitle />
          <ProductCardImage />
          <ProductCardAddToCard />
          <ProductCardCounter productId={product.id} />
        </ProductCard>
      ))}
    </div>
  )
}

function Summary() {
  const { cart } = useCartContext()

  return (
    <div className='fixed w-full right-0 bottom-0 left-0 p-3'>
      <div className='flex items-center w-full h-[60px] bg-zinc-800 px-5 rounded-full'>
        <div className='flex justify-center items-center gap-10 w-full'>
          <h2 className='text-zinc-50'>Корзина / {cart.count} шт</h2>
          <h2 className='text-zinc-50'>Сумма: {cart.amount}</h2>
          <Link href='/checkout'>
            <Button className='rounded-full' variant='outline' size='sm'>
              Оформить заказ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
