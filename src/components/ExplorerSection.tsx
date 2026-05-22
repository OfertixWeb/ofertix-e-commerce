import type React from "react"
import Card from "./CardProduct"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import type { Product } from "../utils/app_types"
import { supabase } from "../supabase_client"

const PAGE_SIZE = 20

const ExplorerSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)

      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(from, to)

      if (!error) {
        setProducts(data ?? [])
        setTotal(count ?? 0)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  // 🔥 Fixed pagination logic
  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = []

    for (let p = 1; p <= totalPages; p++) {
      const nearCurrent = Math.abs(p - page) <= 1
      const isEdge = p === 1 || p === totalPages

      if (nearCurrent || isEdge) {
        const last = pages[pages.length - 1]

        if (typeof last === "number" && p - last > 1) {
          pages.push("...")
        }

        if (last !== p) {
          pages.push(p)
        }
      }
    }

    return pages
  }

  return (
    <section className="px-6 py-8">
      <div className="flex items-baseline gap-3 mb-7">
        <h1 className="text-2xl font-normal">
          <b>Explorar</b>
        </h1>
        {!loading && (
          <span className="text-sm text-gray-400">
            {total} productos
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-100" />
              <div className="p-3.5 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-8 bg-gray-100 rounded-xl mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              desc={product.desc}
              normalPrice={product.normal_price}
              oldPrice={product.old_price}
              imgUrl={product.img_url}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 flex items-center gap-1 text-sm border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft /> Anterior
          </button>

          {getPages().map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={`page-${p}-${i}`}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm rounded-lg transition-colors ${page === p
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 flex items-center gap-1 text-sm border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            Siguiente <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  )
}

export default ExplorerSection