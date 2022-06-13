import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const { auth,setAuth} = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async e =>{
    e.preventDefault()
    if([password,email].includes('')){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return  
    }
    try {
      const {data} = await clienteAxios.post('/veterinarios/login',{correo: email, password})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true})
    }

  }
  const {msg} = alerta
  return (
    
      <>
      <div className="">
        <h1 
        className="text-indigo-600 text-center md:text-6xl text-5xl p-2 font-black ">Inicia sesión y administra a tus <span 
        className="text-black">Pacientes</span></h1>
      </div>
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
            htmlFor="inputEmail" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">Email</label>
            <input 
            id="inputEmail"
            type="email" 
            className="border-2 rounded-xl w-full  p-3 mt-3 bg-gray-50 "
            placeholder="ejemplo@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div 
          className="my-3">
            <label 
            htmlFor="inputPassword" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">contraseña</label>
            <input 
            id="inputPassword"
            type="password" 
            className="border-2 rounded-xl w-full p-3 mt-3 bg-gray-50 "
            placeholder="********"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Iniciar Sesión"
          
          className="bg-indigo-600 rounded-xl py-3 px-10  w-full font-bold uppercase text-white hover:bg-indigo-700 hover:cursor-pointer " />
        </form>
        <nav 
        className="mt-10 lg:flex lg:justify-between">
          <Link to="/registrar" 
          className="block text-center my-5 text-gray-500">¿No tienes cuenta? <span 
          className="underline text-blue-600">Regístrate</span></Link>
          <Link to="/olvide-password" 
          className="block text-center my-5 text-gray-500">Olvidé mi contraseña <span 
          className="underline text-blue-600">recuperar cuenta</span></Link>
        </nav>
      </div>
      </>
  )
}
export default Login