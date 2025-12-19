import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMyOwnContext } from './context/Context';
import Home from './components/Home';
import AddTask from './components/AddTask';
import UpdateTask from './components/updateTask';

function App() {
  const {isLoggedIn}=useMyOwnContext()
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn?<Home/>:<Signup />}/>
          <Route path='/login' element={isLoggedIn?null:<Login />}/>
          <Route path='/add-new' element={isLoggedIn?<AddTask />:null}/>
          <Route path='/update/:id' element={isLoggedIn?<UpdateTask />:null}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
