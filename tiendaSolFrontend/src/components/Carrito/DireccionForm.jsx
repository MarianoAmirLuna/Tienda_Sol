import React, { useState, useEffect, useMemo } from "react";

const campos = [
  { name: "calle", label: "Calle", required: true },
  { name: "altura", label: "Número/Altura", required: true },
  { name: "codigoPostal", label: "C.P.", required: true },
  { name: "ciudad", label: "Ciudad", required: true },
  { name: "provincia", label: "Provincia", required: true },
  { name: "pais", label: "País", required: true },
  { name: "piso", label: "Piso (Opcional)", required: false },
  { name: "departamento", label: "Depto (Opcional)", required: false },
];

export default function DireccionForm({ direccionInicial, onChange }) {
  const initialData = useMemo(() => {
    return campos.reduce((acc, c) => ({ ...acc, [c.name]: direccionInicial?.[c.name] || "" }), {
      ...direccionInicial, 
    });
  }, [direccionInicial]);

  const [direccion, setDireccion] = useState(initialData);

  const camposObligatorios = campos.filter(c => c.required).map(c => c.name);
  
  const esValida = useMemo(() => {
    return camposObligatorios.every(campo => String(direccion[campo] || '').trim() !== "");
  }, [direccion, camposObligatorios]);

  useEffect(() => {
    onChange?.(direccion, esValida);
  }, [direccion, esValida, onChange]);


  const manejarCambio = (campo) => (e) => setDireccion(prev => ({ ...prev, [campo]: e.target.value }));

  return (
    <div className="space-y-3">
      {campos.map(({ name, label, required }) => (
        <div key={name} className="relative">
          <input
            type="text"
            id={name}
            placeholder=" "
            value={direccion[name] || ''}
            onChange={manejarCambio(name)}
            className="block w-full px-3 pt-4 pb-1 text-gray-900 bg-white dark:bg-gray-800 border border-gray-300 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          />
          <label
            htmlFor={name}
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      ))}

      <div className={`mt-4 p-2 text-center text-sm rounded ${esValida ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
        {esValida ? 'Dirección completa y lista.' : 'Completa los campos obligatorios (*).'}
      </div>
    </div>
  );
}