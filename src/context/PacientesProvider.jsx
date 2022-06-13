import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext()


export const PacientesProvider = ({children})=>{

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    
    useEffect(()=>{obtenerPacientess()
    },[])
    const obtenerPacientess = async()=>{
        
        try {
            const token = localStorage.getItem('token')
            if(!token)return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        
            const {data} = await clienteAxios('/pacientes', config)
            setPacientes(data)
            
        } catch (error) {
            console.log(error)
        }

    }

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.patch(`/pacientes/${paciente.id}`, paciente, config  )
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }
        }
        else{
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const {createdAt, updatedAt , __v , ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
                guardarPaciente({})
            }
        }
    }
    const setEdicion = (paciente)=>{
        setPaciente(paciente)
    }
    const eliminarPAciente= async (paciente)=>{
        const token = localStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }}
        const confirmar = confirm('Estás seguro que deseas eliminar el registro?')
        if(confirmar){
                try {
                    const {data} = await clienteAxios.delete(`/pacientes/${paciente._id}`, config)
                    const pacienteActualizado = pacientes.filter(pacientes=>pacientes._id !== paciente._id  )
                    setPacientes(pacienteActualizado)
                } catch (error) {
                    console.log(error)
                }
        }
    }
    const borrarPacientes = ()=>{
        setPacientes({})
    }
    

    return(
        <PacientesContext.Provider
        value={{
            pacientes,
            setPacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPAciente,
            borrarPacientes,
            obtenerPacientess
        }}
        >
            {children}
        </PacientesContext.Provider>
    )

}

export default PacientesContext