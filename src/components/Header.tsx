import { FC } from 'react'
import { Navbar } from './common/Navbar'

const Header: FC = () => {
  return (
    <>
      <header className='h-[60px] bg-zinc-100 rounded-full'>
        <div className='flex justify-center items-center h-full'>
          <Navbar />
        </div>
      </header>
    </>
  )
}

export { Header }
