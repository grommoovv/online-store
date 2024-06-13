interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params: { id } }: ProductPageProps) {
  return <section className='flex flex-col gap-5 mt-5'></section>
}
