import type React from "react"
import { FiShoppingCart, FiUser } from "react-icons/fi"
import { MdFavoriteBorder } from "react-icons/md"
import { NavLink } from "react-router"

const iconSize: number = 20

const Header: React.FC = () => {

  return (
    <header className="flex justify-between items-center px-10 py-5 sticky top-0 z-50 bg-white">
      <NavLink to="/">
        <img src="/logo.png" alt="logo" className="w-30 " />
      </NavLink>
      <nav>
        <ul className="flex space-x-4 font-semibold">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/">Productos</NavLink></li>
          <li><NavLink to="/">Categorías</NavLink></li>
          <li><NavLink to="/">Ofertas</NavLink></li>
          <li><NavLink to="/">Contacto</NavLink></li>
        </ul>

      </nav>

      <div className="flex flex-row justify-center items-center gap-5">
        <div>

          <input type="text" placeholder="Buscar" className="border-none rounded-xl focus:outline-none bg-gray-100 p-2" />
        </div>
        <FiUser size={iconSize} />
        <MdFavoriteBorder size={iconSize} />
        <FiShoppingCart size={iconSize} />
      </div>
    </header>
  )
}

export default Header