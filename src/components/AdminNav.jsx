import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="flex flex-wrap text-center md:text-left">
        <Link
            to="/admin/perfil"
            className="m-2 md:my-0 w-full md:w-auto font-bold uppercase text-gray-500 mx-3"
            >Perfil
            </Link>
        <Link
            to="/admin/cambiar-password"
            className="m-2 md:my-0 w-full md:w-auto font-bold uppercase text-gray-500"
            >Cambiar contraseña
            </Link>
    </nav>
  )
}

export default AdminNav