import React, { useEffect, useRef } from 'react'
import { Form, InputNumber, Input, Schema } from 'rsuite';
import { useParams } from 'react-router-dom'
import { BackendAPI } from '../../services';
import prince from '../../assets/prince.png'
import bg from '../../assets/bg-7201.jpg'
import bg_720 from '../../assets/bg-7201.jpg'
const ConfirmAssistance = () => {

  const [loading, setLoading] = React.useState(true)
  const [invitation, setInvitation] = React.useState({
    id: null,
    name: "",
    number_of_invites: 1,
    send: true,
    invites_confirmed: 1,
    confirm_invitation: false,
    uuid: "",
    phone_number: 0
  })
  const invitationRef = useRef()

  const invitationModel = Schema.Model({
    name: Schema.Types.StringType().isRequired('This field is required.'),
    invites_confirmed: Schema.Types.NumberType().isRequired('This field is required.'),
    confirm_invitation: Schema.Types.BooleanType().isRequired('This field is required.'),
    phone_number: Schema.Types.StringType().isRequired('This field is required.')
  })


  return (
    <main className='w-full mx-auto min-h-screen flex flex-col justify-center items-center gap-10 relative px-5'
      style={{
        backgroundImage: `url(${window.innerWidth <= 720 ? bg_720 : bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {/* <img src={bg} alt="" className=' absolute z-0 ' /> */}
      <img src={prince} alt="el principito" className='absolute  top-5 lg:top-64 lg:right-10 z-0 lg:max-w-lg' />
      <section className='w-full max-w-xl z-10 bg-white border-red-500 p-5 rounded-xl'>
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
              placeholder="Joan Lozano"
              className="w-full"
              maxLength={25}
              size='lg'
            />
          </Form.Group>
          <Form.Group className="w-full m-0">
            <Form.ControlLabel className="pl-2 text-base">Confirmacion (Cantidad)</Form.ControlLabel>
            <Form.Control
              name="invites_confirmed"
              placeholder="Joan Lozano"
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
              placeholder="Joan Lozano"
              className="w-full"
              onChange={(value) => {
                const formattedValue = value.replace(/[^\d+]/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
                setInvitation({ ...invitation, phone_number: formattedValue });
              }}
              maxLength={13}
              size='lg'
            />
          </Form.Group>
          <div className='w-full flex justify-center items-center gap-2'>
            <button className='w-[200px] p-2 bg-[#6ed2e1]  hover:bg-[#6ea4e1] transition-all duration-150 text-base rounded-lg text-black '>Asistire</button>
            <button className='w-[200px] p-2 bg-[#ead7ba] hover:bg-[#dac8ab] transition-all duration-150 text-base rounded-lg text-black '>No Asistire</button>
          </div>
        </Form>
      </section>
    </main>
  )
}

export default ConfirmAssistance