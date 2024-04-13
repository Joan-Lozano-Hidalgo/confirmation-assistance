import React, { useState, useEffect, Fragment } from 'react'
import { BackendAPI } from '../../services'
import { Loader } from 'rsuite'

const InvitationNegated = () => {

    const [loading, setLoading] = useState(true)
    const [invitations, setInvitations] = useState([])

    const getInvitations = async () => {
        try {
            const { data } = await BackendAPI.getInvitationsFilters(`?filters[confirm_invitation][$eq]=false`)
            const datos = data?.data.map((item) => {
                return {
                    id: item.id,
                    name: item?.attributes?.name,
                    invites_confirmed: item?.attributes?.invites_confirmed,
                    confirm_invitation: item?.attributes?.confirm_invitation,
                    uuid: item?.attributes?.uuid,
                    phone_number: item?.attributes?.phone_number

                }
            })
            setInvitations(datos)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getInvitations()
    }, [])

    return (
        <main className='w-full  flex flex-col gap-5 '>
            <h3 className='text-black'>Invitaciones aceptadas</h3>
            <section className='w-full flex flex-col  justify-center items-center gap-5'>
                {
                    loading ?
                        <Loader
                            backdrop
                            content="Cargando..."
                            vertical
                            className="z-10"
                            size="lg"
                        />
                        :
                        <Fragment>
                            {
                                invitations.length === 0 ?
                                    <div className="w-full flex justify-center items-center">
                                        <h3 className='text-black'>No hay datos para mostrar</h3>
                                    </div>
                                    :
                                    <div className="w-full overflow-x-auto border rounded-md">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-52">Nombre</th>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-52">Invitados confirmados</th>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-52">Confirmación de invitación</th>
                                                    {/* <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-52">UUID</th> */}
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-52">Teléfono</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {
                                                    invitations.map((item) => {
                                                        return (
                                                            <tr key={item.id} className="divide-x">
                                                                <td className={`px-3 py-3.5 text-left text-sm font-medium text-gray-900`}>{item.name}</td>
                                                                <td className={`px-3 py-3.5 text-left text-sm font-medium text-gray-900`}>{item.invites_confirmed}</td>
                                                                <td className={`px-3 py-3.5 text-left text-sm font-medium text-gray-900`}>{item.confirm_invitation ?
                                                                    <div className='w-fit flex justify-start items-center gap-2 border px-3 py-1 rounded-lg'>
                                                                        <div className='w-4 h-4 min-w-4 min-h-4 rounded-full bg-green-500'></div>
                                                                        <span>Aceptada</span>
                                                                    </div> :
                                                                    <div className='w-fit flex justify-start items-center gap-2 border px-3 py-1 rounded-lg'>
                                                                        <div className='w-4 h-4 min-w-4 min-h-4 rounded-full bg-red-500'></div>
                                                                        <span>Negada</span>
                                                                    </div>
                                                                }</td>
                                                                {/* <td className={`px-3 py-3.5 text-left text-sm font-medium text-gray-900`}>{item.uuid}</td> */}
                                                                <td className={`px-3 py-3.5 text-left text-sm font-medium text-gray-900`}>{item.phone_number}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </Fragment>
                }
            </section>
        </main>
    )
}

export default InvitationNegated