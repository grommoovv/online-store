import Link from 'next/link'
import { FC } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { FilterByStatusVariants, StatusEnum } from '@/lib/constants'

interface FilterProps {
  variants: FilterByStatusVariants[]
  searchParams: {
    type?: string
  }
}

interface HrefReturn {
  pathname: string
  query?: {
    type?: StatusEnum
  }
}

const Filter: FC<FilterProps> = ({ variants, searchParams }) => {
  const generateHref = (value: StatusEnum): HrefReturn => {
    if (value === StatusEnum.ALL) {
      return { pathname: '/catalog' }
    } else {
      return {
        pathname: '/catalog',
        query: {
          type: value,
        },
      }
    }
  }

  return (
    <>
      <div className='flex gap-2 bg-zinc-100 dark:bg-zinc-800 w-max p-1 rounded-full'>
        {variants.map((variant) => (
          <Link href={generateHref(variant.value)} key={variant.id}>
            <Button
              className={cn(
                'rounded-full',
                (!searchParams.type && variant.value === StatusEnum.ALL) ||
                  variant.value === searchParams.type
                  ? 'hover:bg-white dark:hover:bg-zinc-950'
                  : 'hover:bg-zinc-200 dark:hover:bg-zinc-900'
              )}
              variant={
                (!searchParams.type && variant.value === StatusEnum.ALL) ||
                variant.value === searchParams.type
                  ? 'outline'
                  : 'ghost'
              }
              size='sm'
            >
              {variant.name}
            </Button>
          </Link>
        ))}
      </div>
    </>
  )
}

export { Filter }
