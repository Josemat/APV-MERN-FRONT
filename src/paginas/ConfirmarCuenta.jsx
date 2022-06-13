
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})


  const params  = useParams()
  const {token} = params
  

  useEffect(()=>{
    const confirmarCuenta = async ()=>{
      try {
        const url = `/veterinarios/confirmar/${token}`
        const {data} = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg:data.msg
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    }
    confirmarCuenta();
  },[])
  return (
      <>
      <div>
        <h1 
        className="text-indigo-600 text-center md:text-7xl text-5xl p-2 font-black -m-9">Confirma tu cuenta y comienza a administrar a tus <span 
        className="text-black">Pacientes</span></h1>
      </div>
      <div className="mt-20 shadow-lg px-5 py-10 rounded-xl bg-white">
      {!cargando &&
        <Alerta 
          alerta={alerta}
          />}
      {cuentaConfirmada && <nav 
        className="mt-10 block">
          <Link to="/" 
          className="block text-center my-5 text-gray-500">
          <span 
          className="underline text-blue-600">Inicia sesión</span></Link>
        </nav>}
      </div>
      </>
  )
}

export default ConfirmarCuenta