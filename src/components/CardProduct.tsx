import type React from "react"
import LazyImage from "./LazyImage"

interface CardProps {
  desc: string
  normalPrice: number
  oldPrice?: number
  imgUrl: string
  lazy?: boolean
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n)

const imageClassName = "w-full aspect-square object-cover bg-gray-50"

const Card: React.FC<CardProps> = ({ desc, normalPrice, oldPrice, imgUrl, lazy = false }) => {
  const discount = oldPrice ? Math.round((1 - normalPrice / oldPrice) * 100) : null
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none"
  }

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:border-red-500">
      {lazy ? (
        <LazyImage
          className={imageClassName}
          src={imgUrl}
          alt={desc}
          onError={handleImageError}
        />
      ) : (
        <img
          className={imageClassName}
          src={imgUrl}
          alt={desc}
          onError={handleImageError}
        />
      )}
      <div className="p-3.5">
        <p className="text-sm font-medium text-gray-900 leading-snug mb-2.5 line-clamp-2">{desc}</p>

        {oldPrice && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400 line-through">{fmt(oldPrice)}</span>
            {discount && (
              <span className="text-xs font-medium bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            )}
          </div>
        )}

        <p className="text-lg font-semibold text-orange-600 mb-3">{fmt(normalPrice)}</p>

        <button className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl py-2 transition-colors hover:bg-red-600 hover:border-red-600 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default Card