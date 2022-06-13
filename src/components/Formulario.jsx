import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
    const [nombre, setNombre]=useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [alerta, setAlerta] = useState({})
    const [id, setId] = useState(null)

    const {guardarPaciente, paciente} = usePacientes()

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setSintomas(paciente.sintomas)
            setFecha(new Date(paciente.fecha).toISOString().slice(0,10))
            setId(paciente._id)
        }

    },[paciente])
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            return setAlerta({
                msg: 'No pueden haber campos vacíos',
                error: true
            })
            
        }
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({msg: 'Paciente guardado correctamente!'})
        setTimeout(() => {
            setAlerta({})
            setNombre('')
            setPropietario('')
            setEmail('')
            setFecha('')
            setSintomas('')
            setId(null)
        }, 3000);
    }
    const {msg} = alerta
  return (
      <>
       <h2
        className="font-black text-xl text-center"
        >Ingresa tus Pacientes</h2>
        <p
        className="text-xl mt-5 mb-10 text-center"
        >Añade a tus pacientes {''}
        <span
        className="font-bold text-indigo-600"
        > y adminístralos</span></p>
      
        <form
        onSubmit={handleSubmit}
        className="bg-white py-10 mb-10 px-5 lg:mb-0 shadow-md rounded-md"
        >
            <div className="mb-5">
                <label
                htmlFor="mascota"
                className="uppercase font-bold"
                >Mascota</label>
                <input 
                type="text"
                id="mascota"
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="propietario" 
                className="uppercase font-bold"
                >Propietario</label>
                <input 
                type="text"
                id="propietario"
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={e=>setPropietario(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="email" 
                className="uppercase font-bold"
                >Email propietario</label>
                <input 
                type="email"
                id="email"
                placeholder="Email de contacto"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="date" 
                className="uppercase font-bold"
                >Fecha de Consulta</label>
                <input 
                type="date"
                id="date"
                placeholder="Síntomas de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={e=>setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                htmlFor="sintomas"
                className="text-gray-700 uppercase font-bold"
                >Síntomas </label>
                <textarea 
                name="sintomas" 
                id="sintomas" 
                placeholder="Sintomas de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={sintomas}
                onChange={e=>setSintomas(e.target.value)}
                />
            </div>
            <input type="submit"
            className="bg-indigo-700 w-full p-3 text-white uppercase font-bold mb-5 hover:bg-indigo-800 cursor-pointer transition-colors rounded-md"
            value={id ? "Guardar cambios" : "Agregar Paciente"} />
            {msg && <Alerta 
          alerta={alerta}
          />}
        </form>
      </>
  )
}

export default Formulario