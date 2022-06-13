import AdminNav from "../components/AdminNav"
import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {
    const {cambiarPassword} = useAuth()
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: '',
        pwd_rpt: ''
    })
    const handleSubmit = async e =>{
        e.preventDefault()

        /* A esto lo habia hecho antes de que lo explique
        setTimeout(() => {
            setAlerta({})
        }, 3000);
        if(passwordNuevo !== passwordNuevoRepite || [passwordNuevo, passwordNuevoRepite].includes('') ){
            return setAlerta({
                msg: 'El nuevo Password no coincide',
                error: true
            })
        }
        if(passwordNuevo.length < 6 ){
            return setAlerta({
                msg: 'El nuevo Password debe contener al menos 6 caracteres',
                error: true
            })
        }
       const resultado = await cambiarPassword({
        pwd_actual: password,
        pwd_nuevo: passwordNuevo
    })*/
    if(Object.values(password).some(campo=>campo === '')){
        return setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })
    }
    if(password.pwd_nuevo.length < 6){
        return setAlerta({
            msg: 'El Password debe tener al menos 6 caracteres',
            error: true
        })
    }
    if(password.pwd_nuevo !== password.pwd_rpt){
        return setAlerta({
            msg: 'Los passwords nuevos no coinciden!',
            error: true
        })
    }
    const resultado = await cambiarPassword(password)
       setAlerta(resultado)
       setTimeout(() => {
           setAlerta({})
           
       }, 3000);
    }
    const {msg} = alerta
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-5 md:mt-10">Cambiar Contraseña</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modificá tu {' '}
      <span className="text-indigo-600 font-bold">contraseña</span></p>
      <div className="flex justify-center">
          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg&& <Alerta 
                    alerta={alerta}
              />}
              <form 
              onSubmit={handleSubmit}
              >
                  <div className="my-3">
                      <label 
                      htmlFor="password" 
                      className=" uppercase font-bold text-gray-600">Contraseña actual</label>
                      <input 
                      type="password" 
                      name="pwd_actual" 
                      id="password"
                      placeholder="Contraseña Actual" 
                      onChange={e=>setPassword({
                          ...password,
                          [e.target.name]: e.target.value
                      })}
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />
                  </div>
                  <div className="my-3">
                      <label 
                      htmlFor="nuevoPassword" 
                      className=" uppercase font-bold text-gray-600">Contraseña nueva</label>
                      <input 
                      type="password"
                      name="pwd_nuevo" 
                      id="nuevoPassword" 
                      placeholder="Ingresá Contraseña nueva" 
                      onChange={e=>setPassword({
                        ...password,
                        [e.target.name]: e.target.value
                    })}
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />
                  </div>
                  <div className="my-3">
                      <label 
                      htmlFor="nuevoPasswordRepite" 
                      className=" uppercase font-bold text-gray-600">Repitir Contraseña</label>
                      <input 
                      type="password"
                      name="pwd_rpt" 
                      id="nuevoPasswordRepite" 
                      placeholder="Repetir Contraseña nueva"
                      onChange={e=>setPassword({
                        ...password,
                        [e.target.name]: e.target.value
                    })}
                      className="border bg-gray-50 w-full p-2 mt-5 rounded-lg" />
                  </div>
                
                  <input 
                  type="submit"
                  value="Cambiar Password"
                  className=" bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                   />
              </form>
          </div>
      </div>
    </>
  )
}

export default CambiarPassword