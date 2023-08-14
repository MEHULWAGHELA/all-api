import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Api from "./components/function/Api";
import ClassApi from "./components/class/ClassApi";
import ProductApi from "./components/class/ProductApi";
import TokenApi from "./components/function/TokenApi";
import UserApi from "./components/function/UserApi";
import FetchApi from "./components/function/FetchApi";
import ZoomImage from "./components/function/Zoomimage";

function App() {
  return (
    <div className="position-relative">
      {/* <Api /> */}
      {/* <ClassApi /> */}
      {/* <ProductApi /> */}
      {/* <UserApi /> */}
      {/* <FetchApi/> */}
      {/* <TokenApi /> */}
      <ZoomImage />
    </div>
  );
}
 
export default App;
