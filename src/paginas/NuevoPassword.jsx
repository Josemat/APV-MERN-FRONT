import { useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import { Link } from "react-router-dom"


function NuevoPassword() {
  const [password, setPassword] = useState('')
  const [repitePassword, setRepitePassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passModificado, setPassModificado] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect( () => {
    const comprobarToken = async ()=>{
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({msg: 'ingresa una nueva contraseña'})
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'El enlace ya expiró'
        })
      }
    }
    comprobarToken()
  },[])

  const handleSubmit = async e =>{
    e.preventDefault()
    if(password !== repitePassword){
      setAlerta({msg: 'La contraseña no coincide', error: true})
      return
    }
    if (password === '' || repitePassword === '') {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return
    }
    try {
      await clienteAxios.post(`/veterinarios/olvide-password/${token}`,{password})
      setAlerta({msg: 'Contraseña actualizada exitosamente!', error: false})
      setPassModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true})
    }
  }
  const {msg} = alerta
  return (
    <>
    <div>
    <h1 
        className="text-indigo-600 text-center text-7xl p-2 font-black">Recupera tu contraseña y no pierdas{' '}
        <span 
        className="text-black">a tus Pacientes</span></h1>
    </div>
    <div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg&&
        <Alerta 
        alerta={alerta}
        />}
          {tokenValido &&
            <form
          onSubmit={handleSubmit}
          >
          <div 
          className="my-3">
            <label 
            htmlFor="inputPassword" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">Nuevo password</label>
            <input 
            id="inputPassword" 
            type="password" 
            className="border-2 rounded-xl w-3/4 p-3 mt-3 bg-gray-50 " 
            placeholder=" Ingresa una nueva contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div 
          className="my-3">
            <label 
            htmlFor="inputRepeatPassword" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">Repite Password</label>
            <input 
            id="inputRepeatPassword" 
            type="password" 
            className="border-2 rounded-xl w-3/4 p-3 mt-3 bg-gray-50 " 
            placeholder="Repite nuevamente tu contraseña" 
            value={repitePassword}
            onChange={ e => setRepitePassword(e.target.value)}
            />
          </div>
          <input 
          type="submit"
          value="guardar contraseña"
          className="bg-indigo-600 rounded-xl py-3 px-10 md:w-auto w-3/4  font-bold uppercase text-white hover:bg-indigo-700 hover:cursor-pointer "
           />
          </form>}
            {passModificado&&
            <Link to="/" 
            className="block text-center my-5 text-gray-500"><span 
            className="underline text-blue-600">Iniciá sesión</span></Link>
            }
        </div>
    </div>
      </>
  )
}

export default NuevoPassword