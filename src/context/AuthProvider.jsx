 import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import usePacientes from "../hooks/usePacientes";

 const AuthContext = createContext();

 const AuthProvider = ({children})=>{

     const [cargando, setCargando] = useState(true)
     const [auth, setAuth] = useState({})

     useEffect(()=>{
         const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('veterinarios/perfil',config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
         }
         autenticarUsuario()
     },[])
     
     
     const cerrarSesion = ()=>{
         localStorage.removeItem('token')
         setAuth({})
     }
     const actualizarPerfil = async (perfil)=>{
         const {_id} = perfil

        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }}
         try {
             const {data} = await clienteAxios.put(`/veterinarios/perfil/${_id}`, perfil, config)
             setAuth(data)
             return{
                 msg: 'Perfil actualizado correctamente'
             }
             
         } catch (error) {
             return {
                 msg: error.response.data.msg,
                 error: true
             }
         }   
        
     }
     const cambiarPassword = async (pass)=>{
         const token = localStorage.getItem('token')
        if(!token){
            return
        }
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }}
            try {
                const {data} = await clienteAxios.put('/veterinarios/actualizar-password', pass, config)
                return {
                    msg: data.msg
                }
                
            } catch (error) {
                return {
                    msg : error.response.data.msg,
                    error: true
                }
            }
     }

     return(
         <AuthContext.Provider 
         value={{
             auth,
             setAuth,
             cargando,
             setCargando,
             cerrarSesion,
             actualizarPerfil,
             cambiarPassword
             }}>
             {children}
         </AuthContext.Provider>
     )
     
 }

 export {
     AuthProvider
 }

 export default AuthContext