import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import usePacientes from "../hooks/usePacientes"


const Header = () => {
    const {auth, cerrarSesion} = useAuth() 
    const nombre = auth.nombre
    const {borrarPacientes} = usePacientes()
  return (
    <>
        <header className="py-5 bg-indigo-600">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center -mb-8 md:mb-0">
                <h1 className="px-3 font-bold text-indigo-200 text-2xl text-center">
                    <p>Administrador de pacientes de {" "}
                        <span className="text-black">Veterinaria</span>
                    </p>

                </h1>
                <nav className="flex flex-col md:flex-row gap-4 px-3 text-sm font-medium uppercase items-center mt-5 md:mt-0">
                    <Link to="/admin" className="text-white font-bold">Pacientes</Link>
                    <button type="button" onClick={()=>{cerrarSesion() , borrarPacientes()}} className="text-white font-bold mb-2 md:mb-0 uppercase">Cerrar Sesión</button>
                    <Link to="/admin/perfil" title="Perfil" className="text-white font-bold">  <span className="py-3 px-4 border-2 rounded-full bg-black "> {nombre&&nombre.charAt(0)} </span> </Link>
                </nav>
            </div>
        </header>
    </>
  )
}

export default Header