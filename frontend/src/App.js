import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/header/protectedRoute';
import Product from './pages/ProductPage/Product';
import AdminPanel from './pages/admin/index/AdminPanel';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/product' element={
        <ProtectedRoute>
          <Product></Product>
        </ProtectedRoute>
      }></Route>
      <Route path="/admin" element={
        <ProtectedRoute adminOnly={true}>
          <AdminPanel />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
