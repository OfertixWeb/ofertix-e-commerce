import type React from "react";
import heroImage from "../assets/hero.webp"

const Hero: React.FC = () => {

  return (
    <section className="px-10 py-5 flex flex-row justify-between gap-5 bg-linear-to-r from-red-500 to-red-800 w-full h-80">
      <div className="flex flex-col flex-1 justify-center gap-5">
        <h1 className="text-white text-4xl text-wrap font-semibold ">OFERTAS ESPECIALES ESTA SEMANA</h1>
        <p className="text-white text-lg">
          Lorem ipsum dolor sit,
          amet consectetur adipisicing elit.
        </p>
        <button className="bg-white text-red-800 px-5 py-2 rounded-full font-semibold w-max cursor-pointer">Comprar Ahora</button>
      </div>
      <div className="flex-1 flex justify-center">
        <img src={heroImage} alt="hero-image" className="w-1/2" />
      </div>
    </section>
  )

}

export default Hero