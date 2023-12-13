import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import GlobalStyle from './style/GlobalStyles';
import AllProduct from './pages/AllProduct';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

//Outlet 상위경로에서 
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
     <AuthContextProvider client={QueryClient}>
      <GlobalStyle/>
      <Nav/>
      <Routes>
        <Route path='/' element={<AllProduct/>}/> 
      </Routes>
      
      <Outlet/>
     </AuthContextProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
