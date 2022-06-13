import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

import { useState } from "react"

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario ] = useState(false)
  return (
    <div className="flex flex-col md:flex-row">
        <button
        type="button"
        className="uppercase text-white font-bold rounded-md bg-indigo-700 p-3 mx-10 mb-10 md:hidden"
        onClick={()=>setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario? 'Ocultar formulario': 'Mostrar formulario'}
        </button>
      <div className={`${mostrarFormulario ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5 mx-2`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5 mx-2">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes