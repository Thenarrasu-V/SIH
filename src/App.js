import logo from './logo.svg';
import './App.css';
import HomePage from './Home/home ';
import { Route, Router, Routes } from 'react-router-dom';
import PersonalUserPage from './PersonalUser/Personaluser';
import OrganizationPage from './Organization/Organization';

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/personal-user' element={<PersonalUserPage/>}/>
        <Route path='/organization' element={<OrganizationPage/>}/>
      </Routes>
    
  );
}

export default App;
