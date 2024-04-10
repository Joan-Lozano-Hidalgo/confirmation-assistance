import React, { Fragment, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BackendAPI } from '../../services';
import { Loader } from 'rsuite'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    with: 500,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Control de Confirmaciones',
        },
    },
};

const labels = ['Invitados'];

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Asistencias',
                data: [0],
                backgroundColor: '#dac8ab',
            },
            {
                label: 'Inasistencias',
                data: [0],
                backgroundColor: '#6ea4e1',
            },
        ],
    })

    const getData = async () => {
        setLoading(true)
        try {
            const { data } = await BackendAPI.getInvitations()
            const datos = data?.data.map((item) => {
                return {
                    id: item.id,
                    confirm_invitation: item?.attributes?.confirm_invitation,
                }
            })
            const trueCount = datos.filter(item => item.confirm_invitation === true).length;
            const falseCount = datos.filter(item => item.confirm_invitation === false).length;

            setData({
                labels,
                datasets: [
                    {
                        label: 'Asistencias',
                        data: [trueCount],
                        backgroundColor: '#dac8ab',
                    },
                    {
                        label: 'Inasistencias',
                        data: [falseCount],
                        backgroundColor: '#6ea4e1',
                    },
                ],
            })

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <main className='w-full min-h-full flex flex-col gap-5 '>
            <h3 className='text-black'>Dashboard</h3>

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
                        {data?.datasets[0]?.data[0] === 0 && data?.datasets[1]?.data[0] === 0 ?
                            <div className="w-full flex justify-center items-center">
                                <h3 className='text-black'>No hay datos para mostrar</h3>
                            </div>
                            :
                            <section className='w-full  flex justify-center items-center'>
                                <article className='w-full max-w-5xl'>
                                    <Bar options={options} data={data} />
                                </article>
                            </section>
                        }
                    </Fragment>
            }
        </main>
    )
}

export default Dashboard