import { FiSmartphone } from 'react-icons/fi'
import { PiHouseLineBold } from 'react-icons/pi'
import { MdOutlineSportsSoccer } from 'react-icons/md'
import { TbHorseToy, TbPerfume } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import type { JSX } from 'react'
import type { Category } from '../utils/app_types'
import { supabase } from '../supabase_client'

const iconSize = 70

const categoryIcons: Record<string, JSX.Element> = {
  tecnologia: <FiSmartphone size={iconSize} />,
  hogar: <PiHouseLineBold size={iconSize} />,
  deportes: <MdOutlineSportsSoccer size={iconSize} />,
  juguetes: <TbHorseToy size={iconSize} />,
  'cuidado-personal': <TbPerfume size={iconSize} />,
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true)

      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .order('id')

      if (!error) {
        setCategories(data ?? [])
      }

      setLoading(false)
    }

    fetchCategories()
  }, [])

  return (
    <section>
      <h1 className='text-2xl py-10'><b>Categorías</b></h1>
      <div className='flex flex-row gap-10 justify-between w-full'>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='w-40 h-40 bg-gray-200 rounded-xl animate-pulse'
            />
          ))
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className='
              w-40 flex
              flex-col items-center justify-between
              gap-2 p-5
              bg-gray-300
              rounded-xl
              hover:shadow-lg transition-shadow duration-300
              text-wrap cursor-pointer text-center'
            >
              {categoryIcons[category.slug]}
              <p className='text-xl font-semibold'>{category.name}</p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Categories
