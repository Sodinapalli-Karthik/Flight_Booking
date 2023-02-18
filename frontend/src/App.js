import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Flight from "./pages/Flight/Flight";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import ReserveDetails from "./components/reserve details/reserveDetails"
import Payment from "./components/payment/Payment"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/flights" element={<List/>}/>
        <Route path="/flights/:id" element={<Flight/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/reservedetails/:id" element={<ReserveDetails/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
