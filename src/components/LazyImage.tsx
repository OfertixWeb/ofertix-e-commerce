import type React from "react"
import { useEffect, useRef, useState } from "react"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "", onError }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const markLoadedIfComplete = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalHeight > 0) {
      setLoaded(true)
    }
  }

  useEffect(() => {
    setLoaded(false)
  }, [src])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {(!loaded || !isVisible) && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" aria-hidden="true" />
      )}
      {isVisible && (
        <img
          ref={markLoadedIfComplete}
          src={src}
          alt={alt}
          className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={onError}
        />
      )}
    </div>
  )
}

export default LazyImage
