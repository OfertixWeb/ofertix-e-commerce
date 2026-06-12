import type React from "react";
import type { Page, Product } from "../api/api_interfaces";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../api/api_service";
import CardProduct from "./CardProduct";

const ProductInfiniteScroll: React.FC<{ title: string }> = ({ title }) => {
  const [productPage, setProductPage] = useState<Page<Product> | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const page = await getProducts({
          page: pageNumber,
          size: 16,
        });

        setProductPage(page);

        setProductList((prev) => [
          ...prev,
          ...page.data,
        ]);
      } catch (error) {
        console.error("Error loading products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [pageNumber]);

  useEffect(() => {
    const current = bottomRef.current;

    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoading &&
          (productPage == null || !productPage.last)
        ) {
          setPageNumber((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [isLoading, productPage]);

  return (
    <section>
      <h2 className="text-2xl font-bold py-2">{title}</h2>
      <p className="pb-10" >{productList.length} productos</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productList.map((product) => (
          <CardProduct
            key={product.code}
            desc={product.desc}
            normalPrice={product.normalPrice}
            imgUrl={product.imgUrl}
            lazy={true}
          />
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-4">
          Cargando productos...
        </div>
      )}

      <div ref={bottomRef} className="w-full h-1" />
    </section>
  );
};

export default ProductInfiniteScroll;