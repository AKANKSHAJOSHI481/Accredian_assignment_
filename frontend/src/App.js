import SignUp from './SignUp'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Login/>}></Route>
           <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
