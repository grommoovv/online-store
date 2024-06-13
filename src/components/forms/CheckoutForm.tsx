'use client'
import { FC } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCartContext } from '@/context/cart'
import { Order } from '@/domain'
import { toast } from 'sonner'

const checkoutFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'firstName must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'lastName must be at least 2 characters.',
  }),
  patronymic: z.string().min(2, {
    message: 'patronymic must be at least 2 characters.',
  }),
  phoneNumber: z.string().length(11, {
    message: 'Номер телефона должен содержать 11 цифр',
  }),
  email: z.string().email(),
  deliveryAddress: z.string(),
})

const CheckoutForm: FC = () => {
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {},
  })

  const { getOrderProducts } = useCartContext()

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    const order: Order = {
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      phoneNumber: values.phoneNumber,
      email: values.email,
      deliveryAddress: values.deliveryAddress,
      products: getOrderProducts(),
    }

    toast.success('Заказ создан', {
      description: 'Благодарим Вас за заказ. Номер вашего заказа: #1337',
    })
  }

  return (
    <>
      <Form {...form}>
        <div className='flex flex-center flex-col min-w-96'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Имя</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Фамилия</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='patronymic'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Отчество</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Номер телефона</FormLabel>
                  <FormControl>
                    <InputOTP minLength={11} maxLength={11} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={7} />
                        <InputOTPSlot index={8} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={9} />
                        <InputOTPSlot index={10} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Адрес электронной почты</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='deliveryAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>Адрес доставки</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='shad-button_primary'>
              Создать заказ
            </Button>
          </form>
        </div>
      </Form>
    </>
  )
}

export { CheckoutForm }
