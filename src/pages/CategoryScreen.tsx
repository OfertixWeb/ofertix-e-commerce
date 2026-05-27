import type React from "react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import PageLayout from "../components/PageLayout"
import ProductInfiniteScroll from "../components/ProductInfiniteScroll"
import type { Category } from "../utils/app_types"
import { supabase } from "../supabase_client"

const CategoryScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchCategory() {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setLoading(true)
      setNotFound(false)

      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("slug", slug)
        .maybeSingle()

      if (error || !data) {
        setCategory(null)
        setNotFound(true)
      } else {
        setCategory(data)
      }

      setLoading(false)
    }

    fetchCategory()
  }, [slug])

  return (
    <PageLayout>
      <main className="px-30 py-20 flex flex-col gap-10">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 w-fit">
          ← Volver al inicio
        </Link>

        {loading ? (
          <div className="px-6 py-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-7" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="aspect-square bg-gray-100" />
                  <div className="p-3.5 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : notFound || !category ? (
          <section className="px-6 py-8 text-center">
            <h1 className="text-2xl font-semibold mb-3">Categoría no encontrada</h1>
            <p className="text-gray-500 mb-6">La categoría que buscas no existe.</p>
            <Link to="/" className="text-red-600 hover:underline">
              Ir al inicio
            </Link>
          </section>
        ) : (
          <ProductInfiniteScroll title={category.name} categoryId={category.id} />
        )}
      </main>
    </PageLayout>
  )
}

export default CategoryScreen
