import { useRef, useState } from "react";
import imageLogo from "../../assets/campestre.png";
import { toast } from "react-toastify";
import { Button, Form, InputGroup } from "rsuite";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {

  const loginRef = useRef();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
    app: import.meta.env.VITE_ID,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (loginRef.current.check()) {
      console.log(userInfo);
      toast.success("Inicio de sesion exitoso");
    }
  };

  return (

    <div className="w-full min-h-screen flex justify-center items-center sm:px-6 lg:px-8 bg-indigo-600">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="space-y-6 flex flex-col justify-center items-start">
            <img className="mx-auto h-32 w-auto rounded-full"
              src="https://avatars.githubusercontent.com/u/1164551?v=4"
              // src={imageLogo}
              alt="Logo" />
            <Form
              fluid
              formValue={userInfo}
              onChange={(value) => setUserInfo(value)}
              ref={loginRef}
              className="w-full"
            >
              <Form.Group controlId="userName">
                <Form.ControlLabel>Usuario</Form.ControlLabel>
                <Form.Control name="userName" />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.ControlLabel>Contraseña </Form.ControlLabel>
                <InputGroup>
                  <Form.Control
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                  />
                  <InputGroup.Addon className="cursor-pointer">
                    {!showPassword ? (
                      <abbr title="mostrar">
                        <EyeIcon
                          className="w-4 h-4"
                          onClick={() => setShowPassword(true)}
                        />
                      </abbr>
                    ) : (
                      <abbr title="ocultar">
                        <EyeSlashIcon
                          className="w-4 h-4"
                          onClick={() => setShowPassword(false)}
                        />
                      </abbr>
                    )}
                  </InputGroup.Addon>
                </InputGroup>
              </Form.Group>
              <Form.Group className="w-full flex justify-center">
                <button className="w-fit py-2 px-3 rounded-lg bg-indigo-600 text-white text-base hover:bg-indigo-900 transition-all duration-150 ease-in-out" onClick={() => handleLogin()}>
                  Iniciar sesion
                </button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login