import './App.css';
import Home        from './Page/Home';
import Buy         from './Page/Buy';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact     from './Page/Contact';
import Pet         from './Page/Pet';          // 🐾 Live pets for sale
import Service     from './Page/Service';
import Clinic      from './Page/Clinic';
import Product     from './Page/Product';      // 🛍️ Pet products store
import Cart        from './Page/Cart';
import Checkout    from './Page/Checkout';
import Login       from './Page/Login';
import AddressForm from './Page/Address';
import Signup      from './Page/Signup';
import MyOrders    from './Page/Myorder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'        element={<Home />}        />
        <Route path='/clinic'  element={<Clinic />}      />
        <Route path='/contact' element={<Contact />}     />
        <Route path='/pet'     element={<Pet />}         />  {/* Live pets gallery */}
        <Route path='/service' element={<Service />}     />
        <Route path='/buy'     element={<Buy />}         />
        <Route path='/product' element={<Product />}     />  {/* Pet products store */}
        <Route path='/cart'    element={<Cart />}        />
        <Route path='/checkout'element={<Checkout />}    />
        <Route path='/login'   element={<Login />}       />
        <Route path='/address' element={<AddressForm />} />
        <Route path='/signup'  element={<Signup />}      />
        <Route path='/myorder' element={<MyOrders />}    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;