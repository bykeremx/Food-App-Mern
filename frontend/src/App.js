import { Routes, Route, Router } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/header/protectedRoute';
import Product from './pages/ProductPage/Product';

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
    </Routes>
  );
};

export default App;
