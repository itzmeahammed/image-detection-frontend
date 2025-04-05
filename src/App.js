import "./App.css";
import GoogleMapsTraffic from "./components/googlemap";
import LoginSignup from "./components/loginSignup";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DragDropUpload from "./components/dragDropUpload";
import { useLocation } from "react-router-dom";
import Guidelines from "./components/guidelines";
import FineAndPayment from "./components/fineAndPayment";

function App() {
  const path = useLocation();

  return (
    <>
      {path?.pathname != "/" && <Sidebar />}
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/upload' element={<DragDropUpload />} />
        <Route path='/map' element={<GoogleMapsTraffic />} />
        <Route path='/guide' element={<Guidelines />} />
        <Route path='/fine' element={<FineAndPayment />} />
      </Routes>
    </>
  );
}

export default App;
