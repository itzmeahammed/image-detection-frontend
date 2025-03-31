import "./App.css";
import GoogleMapsTraffic from "./components/googlemap";
import LoginSignup from "./components/loginSignup";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DragDropUpload from "./components/dragDropUpload";
import { useLocation } from "react-router-dom";

function App() {
  const path = useLocation();

  return (
    <>
      {path?.pathname != "/" && <Sidebar />}
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/upload' element={<DragDropUpload />} />
        <Route path='/map' element={<GoogleMapsTraffic />} />
      </Routes>
    </>
  );
}

export default App;
