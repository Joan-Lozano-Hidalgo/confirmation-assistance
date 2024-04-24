import React, { useEffect, useRef, useState } from 'react'
import { Form, InputNumber, Input, Schema } from 'rsuite';
import { useParams } from 'react-router-dom'
import { BackendAPI } from '../../services';
import prince from '../../assets/prince.png'
import bg from '../../assets/bg-7201.jpg'
import bg_720 from '../../assets/bg-7201.jpg'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const ConfirmAssistance = () => {

  const [loading, setLoading] = useState(true)
  const [invitation, setInvitation] = useState({
    id: null,
    name: "",
    number_of_invites: 1,
    send: true,
    invites_confirmed: 1,
    confirm_invitation: false,
    uuid: "",
    phone_number: ""
  })
  const [confirms, setConfirms] = useState([])
  const invitationRef = useRef()

  const invitationModel = Schema.Model({
    name: Schema.Types.StringType().isRequired('Este campo es requerido.'),
    // invites_confirmed: Schema.Types.NumberType().isRequired('This field is required.'),
    // confirm_invitation: Schema.Types.BooleanType().isRequired('This field is required.'),
    phone_number: Schema.Types.StringType().isRequired('Este campo es requerido.')
  })

  const getConfirms = async () => {
    setLoading(true)
    try {
      const { data } = await BackendAPI.getInvitations()
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
      setConfirms(datos)
      return datos
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }

  }

  const clearForm = () => {
    setInvitation({
      id: null,
      name: "",
      number_of_invites: 1,
      send: true,
      invites_confirmed: 1,
      confirm_invitation: false,
      uuid: "",
      phone_number: ""
    })
  }
  const canSendConfirmation = () => {
    const maxConfirmationDate = new Date('2024-04-28')
    const currentDate = new Date()

    return currentDate < maxConfirmationDate
  }

  const sendConfirmation = async (estado) => {
    if (!canSendConfirmation()) {
      toast.error(
          'Lo sentimos, la fecha limite para confirmar asistencia ha pasado. Te sugerimos ponerte en contacto con los organizadores.',
          {autoClose: false}
      )
      return
    }
    if (!invitationRef.current.check()) {
      toast.error('Por favor complete los campos requeridos.')
      return
    }
    const datos = await getConfirms()

    const payload = {
      data: {
        name: invitation?.name,
        invites_confirmed: invitation?.invites_confirmed,
        confirm_invitation: estado,
        phone_number: invitation?.phone_number
      }
    }
    if (datos.some(item => payload?.data?.phone_number === String(item?.phone_number))) {
      toast.error('ya existe una confirmación para ese numero telefónico.')
      return
    } else {
      try {
        const response = await BackendAPI.createInvitation(payload)
        console.log(response?.data)
        if (response.status === 200 && estado === true) {
          toast.success('Nos alegra que nos acompañes.')
          clearForm()
        } else if (response.status === 200 && estado === false) {
          toast.warn('Nos entristece que no puedas acompañarnos.')
        }
      } catch (error) {
        console.error(error)
      }
    }

  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getConfirms()
  }, [])

  useEffect(() => {
    // Cambiar isVisible a true después de 5 segundos para mostrar la sección
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Limpiar el temporizador para evitar fugas de memoria
    return () => clearTimeout(timer);
  }, []);


  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  // Función para redirigir al enlace correcto
  const handleMapLink = () => {
    if (isMobileDevice()) {
      window.location.href = 'geo:0,0?q=Bellanova+Jardín+y+Salones';
    } else {
      window.open('https://maps.app.goo.gl/t9rx59VqXFtnYpZMA', '_blank');
    }
  };

  return (
    <main className='w-full mx-auto min-h-screen flex flex-col justify-center items-center gap-10 relative px-5'
      style={{
        backgroundImage: `url(${window.innerWidth <= 720 ? bg_720 : bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {/* <img src={bg} alt="" className=' absolute z-0 ' /> */}
      <img src={prince} alt="el principito" className='absolute top-5 2xl:top-64 lg:right-10 z-0 max-w-sm lg:max-w-lg' />
      <section className={`w-full max-w-xl z-10 bg-white border-red-500 p-5 rounded-xl ${isVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}`}>
        {/* <section className='w-full max-w-xl z-10 bg-white border-red-500 p-5 rounded-xl '> */}
        <h2 className='w-full text-center  font-semibold mb-10 text-[#ac8e6e]'>Baby Shower Santiago</h2>
        <Form
          fluid
          ref={invitationRef}
          model={invitationModel}
          formValue={invitation}
          onChange={(value) => setInvitation(value)}
          className="w-full grid grid-cols-1 gap-2 gap-y-0 place-items-start"
        >
          <Form.Group className="w-full m-0">
            <Form.ControlLabel className="pl-2 text-base">Nombre</Form.ControlLabel>
            <Form.Control
              name="name"
              placeholder="Ingrese su nombre"
              className="w-full"
              maxLength={25}
              size='lg'
            />
          </Form.Group>
          <Form.Group className="w-full m-0">
            <Form.ControlLabel className="pl-2 text-base">Confirmacion (No sobrepasar la cantidad segun invitación)</Form.ControlLabel>
            <Form.Control
              name="invites_confirmed"
              placeholder="1"
              className="w-full"
              accepter={InputNumber}
              min={1}
              max={6}
              size='lg'
            />
          </Form.Group>
          <Form.Group className="w-full m-0">
            <Form.ControlLabel className="pl-2 text-base">Telefono</Form.ControlLabel>
            <Form.Control
              name="phone_number"
              placeholder="Tu número de telefono al que se te envio la invitación"
              className="w-full"
              onChange={(value) => {
                const formattedValue = value.replace(/[^\d+]/g, '');
                setInvitation({ ...invitation, phone_number: formattedValue });
              }}
              maxLength={13}
              size='lg'
            />
          </Form.Group>
          <div className='w-full flex justify-center items-center gap-2'>
            <button className='w-[200px] p-2 bg-[#6ed2e1]  hover:bg-[#6ea4e1] transition-all duration-150 text-base rounded-lg text-black'
              onClick={() => {
                sendConfirmation(true)
              }}>Asistire</button>
            <button className='w-[200px] p-2 bg-[#ead7ba] hover:bg-[#dac8ab] transition-all duration-150 text-base rounded-lg text-black'
              onClick={() => {
                sendConfirmation(false)
              }}>No Asistire</button>
          </div>
          <div className='w-full border-stone-300 border-[1px] rounded-lg my-3'></div>
          <p className='w-full text-center mb-3 font-semibold text-base'>
            Domingo 05 de mayo - 3:00 PM <br/>
            Ubicación del evento: Bellanova Jardín y Salones
          </p>
          <div className='w-full flex justify-center items-center gap-2 '>
            <a
              className='w-fit p-2 bg-[#6ea4e1] text- text-base rounded-lg text-black cursor-pointer'
              onClick={handleMapLink}
            // href='https://maps.app.goo.gl/t9rx59VqXFtnYpZMA'
            // href='geo:0,0?q=Bellanova+Jardín+y+Salones'
            // target="_blank"
            >
              <FontAwesomeIcon
                icon={faLocationDot}
                className="w-5 h-5 mr-3" />
              Ver en Maps
            </a>
          </div>
        </Form>
      </section>
    </main >
  )
}

export default ConfirmAssistance
