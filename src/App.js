import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyles';

//Outlet 상위경로에서 
function App() {
  return (
    <>
    <AuthContextProvider>
      <GlobalStyle/>
      <Nav/>
      
      <Outlet/>
    </AuthContextProvider>
    </>
  );
}

export default App;
