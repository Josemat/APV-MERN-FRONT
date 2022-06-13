

function Alerta({alerta}) {
  return (
    <div className={`${alerta.error? 'from-red-800 to-red-400': 'from-indigo-800 to-indigo-400' }
    bg-gradient-to-t text-center p-3 rounded-lg shadow-sm text-white uppercase font-bold w-full`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta