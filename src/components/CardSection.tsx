import type React from "react";
import Card from "./CardProduct";



const CardSection: React.FC = () => {

  return (
    <section>
      <h1 className="py-10 text-2xl"><b>Productos Destacados</b></h1>
      <div className="w-full flex flex-row flex-wrap justify-between gap-5">
        {
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} />
          ))
        }
      </div>
    </section>
  )

}


export default CardSection