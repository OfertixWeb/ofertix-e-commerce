import type React from "react";
import Card from "./CardProduct";
import { useEffect, useState } from "react";
import { supabase } from "../supabase_client";
import type { Product } from "../utils/app_types";

const CardSection: React.FC = () => {

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)

      const { data, error } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .limit(4)

      if (!error) {
        setProducts(data ?? [])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <section>
      <h1 className="py-10 text-2xl">
        <b>Productos Destacados</b>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <Card
              key={product.id}
              desc={product.desc}
              imgUrl={product.img_url}
              normalPrice={product.normal_price}
              oldPrice={product.old_price}
            />
          ))
        )}
      </div>
    </section>
  )

}


export default CardSection