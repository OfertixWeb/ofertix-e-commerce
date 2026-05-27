import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Category } from '../utils/app_types'
import { supabase } from '../supabase_client'

const categoryImages: Record<string, string> = {
  tecnologia: '/categories/tecnologia.svg',
  hogar: '/categories/hogar.svg',
  deportes: '/categories/deportes.svg',
  juguetes: '/categories/juguetes.svg',
  'cuidado-personal': '/categories/cuidado-personal.svg',
}

const categoryAccents: Record<string, string> = {
  tecnologia: 'from-rose-50 to-orange-50 group-hover:from-rose-100 group-hover:to-orange-100',
  hogar: 'from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100',
  deportes: 'from-red-50 to-rose-50 group-hover:from-red-100 group-hover:to-rose-100',
  juguetes: 'from-amber-50 to-yellow-50 group-hover:from-amber-100 group-hover:to-yellow-100',
  'cuidado-personal': 'from-pink-50 to-rose-50 group-hover:from-pink-100 group-hover:to-rose-100',
}

const CategoryCard = ({ category }: { category: Category }) => {
  const imageSrc = categoryImages[category.slug] ?? '/categories/tecnologia.svg'
  const accent = categoryAccents[category.slug] ?? 'from-gray-50 to-gray-100'

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col items-center gap-4 p-5 sm:p-6 bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-red-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
    >
      <div
        className={`relative w-full aspect-square max-w-[88px] rounded-2xl bg-linear-to-br ${accent} flex items-center justify-center transition-all duration-200 group-hover:scale-105`}
      >
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="w-[72%] h-[72%] object-contain drop-shadow-sm"
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-center w-full">
        <p className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
          {category.name}
        </p>
        <span className="text-xs text-gray-400 group-hover:text-red-600 transition-colors">
          Explorar →
        </span>
      </div>
    </Link>
  )
}

const CategorySkeleton = () => (
  <div className="flex flex-col items-center gap-4 p-5 sm:p-6 bg-white border border-gray-100 rounded-2xl animate-pulse">
    <div className="w-full max-w-[88px] aspect-square rounded-2xl bg-gray-100" />
    <div className="w-20 h-4 bg-gray-100 rounded" />
    <div className="w-14 h-3 bg-gray-100 rounded" />
  </div>
)

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
      <div className="flex items-end justify-between gap-4 py-8 sm:py-10">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Categorías</h2>
          <p className="text-sm text-gray-500 mt-1">Encuentra lo que buscas por departamento</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => <CategorySkeleton key={index} />)
          : categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
      </div>
    </section>
  )
}

export default Categories
