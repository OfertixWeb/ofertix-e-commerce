import type React from "react";
import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";

const Footer: React.FC = () => {

  return (
    <footer className=" bg-mauve-950 gap-5 text-white flex flex-col items-center">
      <div className="w-full flex flex-row justify-evenly items-start px-10 py-5 ">
        <section className="flex flex-col gap-2">
          <h1><b>Sobre nosotros</b></h1>
          <ul className="flex flex-col gap-2">
            <li><span>Nuestra historia</span></li>
            <li><span>Misión</span></li>
            <li><span>Carreras</span></li>
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h1><b>Atención al cliente</b></h1>
          <ul className="flex flex-col gap-2">
            <li><span>Contacto</span></li>
            <li><span>Preguntas frecuentes</span></li>
            <li><span>Envíos y devoluciones</span></li>
            <li><span>Términos y condiciones</span></li>
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h1><b>Redes sociales</b></h1>
          <ul className="flex flex-row gap-5">
            <li><a href={"https://www.instagram.com"}><BsInstagram className="hover:text-red-700 transition-colors duration-75 ease-in" size={20}> </BsInstagram></a></li>
            <li><a href={"https://www.facebook.com"}><BsFacebook className="hover:text-red-700 transition-colors duration-75 ease-in" size={20} > </BsFacebook></a></li>
            <li><a href={"https://www.tiktok.com"}><BsTiktok className="hover:text-red-700 transition-colors duration-75 ease-in" size={20}> </BsTiktok></a></li>
          </ul>
        </section>
      </div >
      <span>© Ofertix 2023. Todos los derechos reservados</span>
    </footer>
  )
}

export default Footer