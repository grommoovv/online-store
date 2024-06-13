import { CheckoutForm } from '@/components/forms/CheckoutForm'

export default function CheckoutPage() {
  return (
    <section>
      <div>Оформление заказа</div>
      <div className='grid grid-cols-3'>
        <div className='max-w-[520px]'>
          <CheckoutForm />
        </div>
      </div>
    </section>
  )
}
