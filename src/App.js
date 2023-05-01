
import './styles/AuthPage.scss';
import './styles/MainPage.scss';
import './styles/DashBoard.scss'
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import AdminDashboard from './components/AdminDashboard';
import DashboardOverviewPage from './components/DashboardOverviewPage';
import DashboardAdditemPage from './components/DashboardAdditemPage'
import FullView from './components/FullView';
import ProtectedRoute from './components/ProtectedRoute';
import MainCatalog from './components/MainCatalog';
import Cart from './components/Cart';


function App() {
  return (
     
     <div className='App'>
          <Routes>
            <Route path='*' element={<div>Ничего не найдено</div>}/>
            <Route path='/' element={<App/>}/>
            <Route index element={<Login/>}/>
            <Route path='/register' element={<Register/>}  />
            <Route path='/main' element={<ProtectedRoute children={<MainPage/>}/>}>
                <Route index element={<MainCatalog/>}/>
                <Route path='/main/full-view/:articul' element={<FullView/>} />
                <Route path="/main/userCart" element={<Cart/>}/>
            </Route>
            <Route path='admin-dashboard' element={<ProtectedRoute children={<AdminDashboard/>}/>}>
              <Route index element={<DashboardOverviewPage/>} />
              <Route path='/admin-dashboard/add-item' element={<DashboardAdditemPage/>}/>
            </Route>
         
       </Routes>
     </div>
      
    
  );
}

export default App;
