import { FiSmartphone } from 'react-icons/fi'
import { PiHouseLineBold } from 'react-icons/pi'
import { MdOutlineSportsSoccer } from 'react-icons/md'
import { TbHorseToy, TbPerfume } from 'react-icons/tb'
import type { JSX } from 'react'

const iconSize = 70

const categories: { name: string, icon: JSX.Element }[] = [
  {
    name: 'Tecnología',
    icon: <FiSmartphone size={iconSize} />
  },
  {
    name: 'Hogar',
    icon: <PiHouseLineBold size={iconSize} />
  },
  {
    name: 'Deportes',
    icon: <MdOutlineSportsSoccer size={iconSize} />
  },
  {
    name: 'Juguetes',
    icon: <TbHorseToy size={iconSize} />
  },
  {
    name: 'Cuidado personal',
    icon: <TbPerfume size={iconSize} />
  }

]

const Categories = () => {
  return (
    <section>
      <h1 className='text-2xl py-10'><b>Categorías</b></h1>
      <div className='flex flex-row gap-10 justify-between w-full'>
        {categories.map((category, index) => (
          <div key={index} className='
          w-40 flex 
          flex-col items-center justify-between
          gap-2 p-5 
          bg-gray-300
          rounded-xl 
          hover:shadow-lg transition-shadow duration-300 
          text-wrap cursor-pointer text-center'
          >
            {category.icon}
            <p className='text-xl font-semibold'>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories