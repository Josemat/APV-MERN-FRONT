//Dependencias
import { Outlet, Navigate } from "react-router-dom"
//Componentes
import Footer from "../components/Footer"
import Header from "../components/Header"

import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {
    
    const {auth, cargando} = useAuth({})
    if(cargando) return 'Cargando...'/* Aqui es donde se podria poner un spinner de carga*/
    
  return (
      <>
        <Header />
         {auth?._id? 
            (
                <main className="mx-auto container mt-10">
                    <Outlet />
                </main>
                )
         : <Navigate to="/" />}
        <Footer />
      </>
  )
}

export default RutaProtegida