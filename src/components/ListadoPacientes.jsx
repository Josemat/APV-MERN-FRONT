import { useEffect } from "react"
import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {
    const {pacientes, obtenerPacientess} = usePacientes()
    useEffect(()=>{obtenerPacientess()
    },[])

  return (
      <>
      {pacientes.length?(
        <>
        <h2
        className="font-black text-xl text-center"
        >Sí hay pacientes</h2>
        <p
        className="text-xl mt-5 mb-10 text-center"
        >Administrá tus pacientes {''}
        <span
        className="font-bold text-indigo-600"
        > y citas</span></p>

        {
          pacientes.map(paciente => (
            <Paciente 
            key={paciente._id}
            paciente = {paciente}
            />
          ))
        }
        
        </>
        ):(
        <>
        <h2
        className="font-black text-xl text-center"
        >No hay pacientes</h2>

        <p
        className="text-xl mt-5 mb-10 text-center"
        >Comienza agregando <span
        className="font-bold text-indigo-600"
        >alguno</span></p>
        </>
      )}
      </>
  )
}

export default ListadoPacientes