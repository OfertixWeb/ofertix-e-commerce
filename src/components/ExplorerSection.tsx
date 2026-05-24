import type React from "react"
import Card from "./CardProduct"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Product } from "../utils/app_types"
import { supabase } from "../supabase_client"

const PAGE_SIZE = 20

const ExplorerSection: React.FC = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const loadingMoreRef = useRef(false)
  const productsLengthRef = useRef(0)
  const totalRef = useRef(0)

  const [products, setProducts] = useState<Product[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal] = useState(0)

  productsLengthRef.current = products.length
  totalRef.current = total
  const hasMore = products.length < total

  useEffect(() => {
    async function fetchInitial() {
      setInitialLoading(true)

      const { data, error, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(0, PAGE_SIZE - 1)

      if (!error) {
        setProducts(data ?? [])
        setTotal(count ?? 0)
      }

      setInitialLoading(false)
    }

    fetchInitial()
  }, [])

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || productsLengthRef.current >= totalRef.current) return

    loadingMoreRef.current = true
    setLoadingMore(true)

    const from = productsLengthRef.current
    const to = from + PAGE_SIZE - 1

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .range(from, to)

    if (!error && data?.length) {
      setProducts((prev) => [...prev, ...data])
    }

    loadingMoreRef.current = false
    setLoadingMore(false)
  }, [])

  useEffect(() => {
    const sentinel = loadMoreRef.current
    if (!sentinel || initialLoading || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { rootMargin: "400px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [initialLoading, hasMore, loadMore])

  return (
    <section className="px-6 py-8">
      <div className="flex items-baseline gap-3 mb-7">
        <h1 className="text-2xl font-normal">
          <b>Explorar</b>
        </h1>
        {!initialLoading && (
          <span className="text-sm text-gray-400">
            {total} productos
          </span>
        )}
      </div>

      {initialLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
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
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                desc={product.desc}
                normalPrice={product.normal_price}
                oldPrice={product.old_price}
                imgUrl={product.img_url}
                lazy
              />
            ))}
          </div>

          {hasMore && (
            <div ref={loadMoreRef} className="flex justify-center py-10">
              {loadingMore && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                      <div className="aspect-square bg-gray-100" />
                      <div className="p-3.5 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <p className="text-center text-sm text-gray-400 py-8">
              Has visto todos los productos
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default ExplorerSection
