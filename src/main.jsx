import ReactDOM from 'react-dom/client'
import './index.css'
import "rsuite/dist/rsuite.min.css";
import App from './App'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <title>{import.meta.env.VITE_APP_TITLE}</title >
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="dark"
    />
  </>
)
