import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="text-center">
        <p className="ext-8xl tracking-tight text-indigo-500 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Pagina no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Lo sentimos, no pudimos encontrar la página que estabas buscando.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Error404