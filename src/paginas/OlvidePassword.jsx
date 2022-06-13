import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()
    if (email === '' || email.length < 6) {
      setAlerta({msg:'Email vacío o inválido!', error:true})
      return
    }
    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password',{correo: email})
      setAlerta({msg: data.msg})
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
        className="text-indigo-600 text-center text-7xl p-2 font-black">Recupera tu cuenta y no pierdas {' '}
        <span 
        className="text-black">a tus Pacientes</span></h1>
    </div>
    <div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      
      {msg&&
      <Alerta 
        alerta={alerta}
        />}
        <form
        onSubmit={handleSubmit}
        >
          <div 
          className="my-3">
            <label
              className="block uppercase text-gray-800 text-xl font-bold ml-2">Email
            </label>
            <input 
              type="email" 
              placeholder="Ingresa tu Email"
              className="border-2 rounded-xl w-full p-3 mt-3 bg-gray-50 "
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>

          <input type="submit" value="Recuperar cuenta"
          className="bg-indigo-600 rounded-xl py-3 px-10 md:w-auto w-3/4  font-bold uppercase text-white hover:bg-indigo-700 hover:cursor-pointer " />
          </form>
        <nav 
        className="mt-10 lg:flex lg:justify-between">
          <Link to="/" 
          className="block text-center my-5 text-gray-500">¿Ya tienes cuenta? <span 
          className="underline text-blue-600">Inicia sesión</span></Link>
          <Link to="/registrar" 
          className="block text-center my-5 text-gray-500">¿No tienes cuenta? <span 
          className="underline text-blue-600">Regístrate</span></Link>
        </nav>
      </div>
    </div>
    </>
  )
}
export default OlvidePassword