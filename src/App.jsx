import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Index from './views/index.jsx'
import Detalle from './views/detalle.jsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/pokemon/:id' element ={<Detalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

