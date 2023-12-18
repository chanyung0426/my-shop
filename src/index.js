import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

//컴포넌트
import App from './App';
import NotFound from './pages/NotFound';
import MyCart from './pages/MyCart';
import ProductDetail from './pages/ProductDetail';
import UploadProduct from './pages/UploadProduct';
import CategoryPages from './pages/CategoryPages';
import Search from './pages/Search';
import WritePage from './pages/WritePage';
import Qna from './pages/Qna';

//css
import './index.css';
import BoardDetailPage from './pages/BoardDetailPage';







const root = ReactDOM.createRoot(document.getElementById('root'));
//관리자 인증(조건에 하나라도 만족하지 못하면 페이지를 이동할 수 없게 하고 강제로 홈으로 이동)

const ProtectRouter = ({checkAdmin, children})=>{
  const {user} = useAuthContext();
  if(!user || (checkAdmin && !user.isAdmin)){
    return <Navigate to='/' replace/>
  }
}

const routes = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    errorElement : <NotFound/>,

    children : [
      
      {path : '/cart', element : <MyCart/>},
      {path : '/board/write', element: <WritePage/>},
      {path : '/board/qna', element: <Qna/>},
      {path : '/board/qna/:id', element : <BoardDetailPage/>},
      {path : '/products/detail/:id', element : <ProductDetail/>},
      {path : 'products/:category', element : <CategoryPages/>},
      {path : '/search', element : <Search/>},
      {
        path : '/product/upload', 
        element : 
         
          <UploadProduct/>
      
        
      }
    ]
  }
])

root.render(
  <React.StrictMode>
  <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
