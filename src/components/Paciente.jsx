import usePacientes from "../hooks/usePacientes"
import {addDays, format} from "date-fns"
import { es } from 'date-fns/locale'
 
const Paciente = ({paciente}) => {
    const {nombre, email, propietario, sintomas, fecha, _id } = paciente
    const {setEdicion, eliminarPAciente} = usePacientes()

    const formatearFecha = (fecha)=>{
        return format(addDays(new Date(fecha),1),"dd 'de' MMMM 'de' YYY",{ locale: es })
    }
  return (
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-md">
          <p className="font-bold uppercase text-indigo-600 my-1">Nombre:{' '}
              <span className="text-normal normal-case text-black">{nombre}</span>
          </p>
          <p className="font-bold uppercase text-indigo-600 my-1">Email:{' '}
              <span className="text-normal normal-case text-black">{email}</span>
          </p>
          <p className="font-bold uppercase text-indigo-600 my-1">Propietario:{' '}
              <span className="text-normal normal-case text-black">{propietario}</span>
          </p>
          <p className="font-bold uppercase text-indigo-600 my-1">fecha:{' '}
              <span className="text-normal normal-case text-black">{formatearFecha(fecha)}</span>
          </p>
          <p className="font-bold uppercase text-indigo-600 my-1">síntomas:{' '}
              <span className="text-normal normal-case text-black">{sintomas}</span>
          </p>
          <div
          className="flex md:justify-between m-5  flex-wrap">
              <button
              className="w-full lg:w-auto my-1 lg:my-3 uppercase bg-indigo-700 hover:bg-indigo-800 py-2 px-10 rounded-md text-white font-semibold "
              onClick={()=>setEdicion(paciente)}
              type="button">Editar
              
              </button>
              <button
              className="w-full lg:w-auto my-1 lg:my-3 uppercase bg-red-700 hover:bg-red-800 py-2 px-10 rounded-md text-white font-semibold "
              onClick={()=>eliminarPAciente(paciente)}
              type="button">Eliminar
              </button>
          </div>
      </div>
  )
}

export default Paciente