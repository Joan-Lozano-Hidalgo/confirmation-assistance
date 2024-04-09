import ReactDOM from 'react-dom/client'
import './index.css'
import "rsuite/dist/rsuite.min.css";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <title>{import.meta.env.VITE_APP_TITLE}</title >
    <App />
  </>
)
