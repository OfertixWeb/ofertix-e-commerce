import type React from "react"
import { useEffect, useState } from "react"
import { supabase } from "../supabase_client"
import "./price-range-slider.css"

export type SortOrder = "desc" | "asc"

export interface ProductFiltersState {
  minPrice: number | null
  maxPrice: number | null
  sortOrder: SortOrder
}

export const defaultProductFilters: ProductFiltersState = {
  minPrice: null,
  maxPrice: null,
  sortOrder: "desc",
}

interface ProductFiltersProps {
  categoryId?: number
  value: ProductFiltersState
  onChange: (filters: ProductFiltersState) => void
  disabled?: boolean
}

interface PriceRangeSliderProps {
  min: number
  max: number
  valueMin: number
  valueMax: number
  step: number
  disabled?: boolean
  onChangeMin: (value: number) => void
  onChangeMax: (value: number) => void
  onCommit: () => void
}

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n)

const getStep = (min: number, max: number) => {
  const range = max - min
  if (range <= 0) return 1
  return Math.max(1000, Math.round(range / 100))
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  valueMin,
  valueMax,
  step,
  disabled = false,
  onChangeMin,
  onChangeMax,
  onCommit,
}) => {
  const range = max - min
  const minPercent = range > 0 ? ((valueMin - min) / range) * 100 : 0
  const maxPercent = range > 0 ? ((valueMax - min) / range) * 100 : 100

  return (
    <div className={`price-range-slider relative h-8 ${disabled ? "opacity-50" : ""}`}>
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full" />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-red-500 rounded-full"
        style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        disabled={disabled || range <= 0}
        onChange={(e) => onChangeMin(Math.min(Number(e.target.value), valueMax))}
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
        className="z-20"
        aria-label="Precio mínimo"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        disabled={disabled || range <= 0}
        onChange={(e) => onChangeMax(Math.max(Number(e.target.value), valueMin))}
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
        className="z-30"
        aria-label="Precio máximo"
      />
    </div>
  )
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categoryId, value, onChange, disabled = false }) => {
  const [priceBounds, setPriceBounds] = useState<{ min: number; max: number } | null>(null)
  const [sliderMin, setSliderMin] = useState(0)
  const [sliderMax, setSliderMax] = useState(0)

  useEffect(() => {
    async function fetchPriceBounds() {
      let minQuery = supabase
        .from("products")
        .select("normal_price")
        .order("normal_price", { ascending: true })
        .limit(1)

      let maxQuery = supabase
        .from("products")
        .select("normal_price")
        .order("normal_price", { ascending: false })
        .limit(1)

      if (categoryId !== undefined) {
        minQuery = minQuery.eq("category_id", categoryId)
        maxQuery = maxQuery.eq("category_id", categoryId)
      }

      const [{ data: minData }, { data: maxData }] = await Promise.all([minQuery, maxQuery])
      const min = minData?.[0]?.normal_price
      const max = maxData?.[0]?.normal_price

      if (min !== undefined && max !== undefined) {
        setPriceBounds({ min, max })
      } else {
        setPriceBounds(null)
      }
    }

    fetchPriceBounds()
  }, [categoryId])

  useEffect(() => {
    if (!priceBounds) return

    setSliderMin(value.minPrice ?? priceBounds.min)
    setSliderMax(value.maxPrice ?? priceBounds.max)
  }, [priceBounds, value.minPrice, value.maxPrice])

  const commitRange = () => {
    if (!priceBounds) return

    const isFullRange = sliderMin <= priceBounds.min && sliderMax >= priceBounds.max

    onChange({
      ...value,
      minPrice: isFullRange ? null : sliderMin,
      maxPrice: isFullRange ? null : sliderMax,
    })
  }

  const clearFilters = () => {
    if (priceBounds) {
      setSliderMin(priceBounds.min)
      setSliderMax(priceBounds.max)
    }
    onChange(defaultProductFilters)
  }

  const hasActiveFilters =
    value.minPrice !== null ||
    value.maxPrice !== null ||
    value.sortOrder !== defaultProductFilters.sortOrder

  const step = priceBounds ? getStep(priceBounds.min, priceBounds.max) : 1000

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex-1 min-w-[220px]">
        <label className="text-xs font-medium text-gray-500">
          Rango de precio
        </label>

        {priceBounds ? (
          <>
            <div className="flex justify-between text-sm text-gray-700 mt-2 mb-3">
              <span>{fmt(sliderMin)}</span>
              <span>{fmt(sliderMax)}</span>
            </div>
            <PriceRangeSlider
              min={priceBounds.min}
              max={priceBounds.max}
              valueMin={sliderMin}
              valueMax={sliderMax}
              step={step}
              disabled={disabled}
              onChangeMin={setSliderMin}
              onChangeMax={setSliderMax}
              onCommit={commitRange}
            />
          </>
        ) : (
          <div className="mt-2 h-8 bg-gray-200 rounded-full animate-pulse" />
        )}
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sort-order" className="text-xs font-medium text-gray-500">
            Ordenar por precio
          </label>
          <select
            id="sort-order"
            disabled={disabled}
            value={value.sortOrder}
            onChange={(e) => onChange({ ...value, sortOrder: e.target.value as SortOrder })}
            className="w-44 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-red-500 disabled:opacity-50"
          >
            <option value="desc">Mayor a menor</option>
            <option value="asc">Menor a mayor</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            disabled={disabled}
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductFilters
