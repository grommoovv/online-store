import { popular } from '@/__mock__/products'
import {
  ProductCard,
  ProductCardAddToCard,
  ProductCardCategory,
  ProductCardImage,
  ProductCardLink,
  ProductCardTitle,
} from '@/components/cards/ProductCard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className='flex flex-col gap-16'>
      <div>
        <AspectRatio ratio={21 / 9} className='bg-muted'>
          <div className='w-full h-full bg-zinc-200 rounded-3xl'></div>
        </AspectRatio>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h2 className='h2'>New Products</h2>
          <Link href='/catalog'>
            <div className='text-secondary'>view</div>
          </Link>
        </div>
        <PopularProductList />
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h2 className='h2'>Popular Products</h2>
          <Link href='/catalog'>
            <div className='text-secondary'>view</div>
          </Link>
        </div>
        <PopularProductList />
      </div>
    </section>
  )
}

function PopularProductList() {
  return (
    <>
      <div className='grid grid-cols-4 gap-3'>
        {popular.map((product) => (
          <ProductCard product={product} key={product.id}>
            <ProductCardLink>
              <ProductCardCategory />
              <ProductCardTitle />
              <ProductCardImage />
            </ProductCardLink>
            <ProductCardAddToCard />
          </ProductCard>
        ))}
      </div>
    </>
  )
}
