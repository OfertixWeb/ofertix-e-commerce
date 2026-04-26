import type React from "react"

const Card: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 justify-between bg-gray-100 shadow-2xl p-5 rounded-xl min-w-50 cursor-pointer hover:shadow-gray-600 hover:scale-105 hover:shadow-2xl transition-all duration-100 ease-in">
      <div className="aspect-square bg-gray-300 rounded-xl"></div>
      <span><b>Lorem ipsum dolor sit amet</b></span>
      <div className="flex flex-row justify-start gap-2">
        <span><s>$ 10.000</s></span>
        <span className="text-xl text-red-600"><b>$ 5.000</b></span>
      </div>
      <button className="bg-red-600 text-white rounded-lg p-2 cursor-pointer"><b>Añadir al carrito</b></button>
    </div>
  )
}

export default Card