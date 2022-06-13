import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repitePassword, setRepitePassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e =>{
    e.preventDefault()
    if([ nombre , email , password , repitePassword ].includes('')){
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true})
      return;
    }
    if(password !== repitePassword){
      setAlerta({ msg: 'El password no coincide', error: true})
      return;
    }
    if (password.length < 6) {
      setAlerta({ msg: 'El password es muy corto, debe contener al menos 6 caracteres', error: true})
      return;
    }
     setAlerta({})

     //Crear usuario en la API

     try {
       const respuesta = await clienteAxios.post('/veterinarios', { nombre, 'correo': email , password })
       
       
       setAlerta({msg: 'Usuario creado exitosamente! Chequea tu correo', error: false})
       setTimeout(() => {
          setAlerta({})
          setNombre('')
          setEmail('')
          setPassword('')
          setRepitePassword('')
       }, 5000);
     } catch (error) {
       setAlerta({
         msg: error.response.data.msg,
         error: true
       })
       setTimeout(() => {
        setAlerta({})
      }, 5000);
     }
     
  }
  const {msg} = alerta
  return (
    <>
    <div>
        <h1 
        className="text-indigo-600 text-center text-7xl p-2 font-black">Crea tu cuenta y administra a 
        <span 
        className="text-black"> tus Pacientes</span></h1>
    </div>

    <div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta 
        alerta={alerta}
        />}
        <form
        onSubmit={handleSubmit}
        >
          
          <div 
          className="my-3">
            <label 
            htmlFor="inputNombre" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">Nombre</label>
            <input 
            id="inputNombre" 
            type="text" 
            className="border-2 rounded-xl w-3/4 p-3 mt-3 bg-gray-50 " 
            placeholder="Ingresa tu nombre" 
            value={nombre}
            onChange={ e => setNombre(e.target.value)}
            />
            
          </div>
          <div 
          className="my-3">
            <label 
            htmlFor="inputEmail" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">Email</label>
            <input 
            id="inputEmail" 
            type="email" 
            className="border-2 rounded-xl w-3/4 p-3 mt-3 bg-gray-50 " 
            placeholder="Ingresa tu Email"
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
            className="border-2 rounded-xl w-3/4 p-3 mt-3 bg-gray-50 " 
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div 
          className="my-3">
            <label 
            htmlFor="inputRepeatPassword" 
            className="block uppercase text-gray-800 text-xl font-bold ml-2">Repite contraseña</label>
            <input 
            id="inputRepeatPassword" 
            type="password" 
            className="border-2 rounded-xl w-3/4 p-3 mt-3 bg-gray-50 " 
            placeholder="Repite tu contraseña" 
            value={repitePassword}
            onChange={ e => setRepitePassword(e.target.value)}
            />
          </div>
          <input 
          type="submit"
          value="Crear cuenta"
          className="bg-indigo-600 rounded-xl py-3 px-10 md:w-auto w-3/4  font-bold uppercase text-white hover:bg-indigo-700 hover:cursor-pointer "
           />
        </form>
        <nav 
        className="mt-10 lg:flex lg:justify-between">
          <Link to="/" 
          className="block text-center my-5 text-gray-500">¿Ya tienes cuenta? <span 
          className="underline text-blue-600">Inicia sesión</span></Link>
          <Link to="/olvide-password" 
          className="block text-center my-5 text-gray-500">Olvidé mi contraseña <span 
          className="underline text-blue-600">Recuperar cuenta</span></Link>
        </nav>
      </div>
    </div>
    </>
  )
}

export default Registrar