import { products } from '@/__mock__/products'
import {
  ProductCard,
  ProductCardAddToCard,
  ProductCardCategory,
  ProductCardImage,
  ProductCardLink,
  ProductCardTitle,
} from '@/components/cards/ProductCard'
import { Filter } from '@/components/common/Filter'
import { Product } from '@/domain'

export enum StatusEnum {
  ALL = 'all',
  PLANNED = 'электроника',
  ONGOING = 'бытовая техника',
  FINISHED = 'аксессуары',
}

export interface FilterByStatusVariants {
  id: number
  name: string
  value: StatusEnum
}

export const filterByStatusVariants: FilterByStatusVariants[] = [
  { id: 0, name: 'All', value: StatusEnum.ALL },
  { id: 1, name: 'Электроника', value: StatusEnum.PLANNED },
  { id: 2, name: 'Бытовая техника', value: StatusEnum.ONGOING },
  { id: 3, name: 'Аксессуары', value: StatusEnum.FINISHED },
]

interface CatalogPageProps {
  searchParams: {
    type?: string
  }
}

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  return (
    <section className='flex flex-col gap-5'>
      <div className='flex justify-center'>
        <Filter variants={filterByStatusVariants} searchParams={searchParams} />
      </div>
      <div>
        <Catalog products={products} currentFilter={searchParams.type} />
      </div>
    </section>
  )
}

interface CatalogProps {
  products: Product[]
  currentFilter?: string
}

function Catalog({ products, currentFilter }: CatalogProps) {
  const filteredProducts = products.filter((product) => {
    if (!currentFilter || currentFilter === StatusEnum.ALL) {
      return true
    }
    return product.category.toLowerCase() === currentFilter.toLowerCase()
  })

  return (
    <div className='grid grid-cols-4 gap-3'>
      {filteredProducts.map((product) => (
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
  )
}
