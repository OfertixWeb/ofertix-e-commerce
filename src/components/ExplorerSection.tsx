import type React from "react";
import Card from "./CardProduct";

const ExplorerSection: React.FC = () => {
  return (
    <section>
      <h1 className="text-2xl pb-10"><b>Explorar</b></h1>
      <div className="flex flex-wrap justify-between gap-5">
        {
          Array.from({ length: 20 }).map((_, index) => (
            <Card key={index} />
          ))
        }
      </div>
    </section>
  )
}

export default ExplorerSection