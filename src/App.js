import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Api from "./components/function/Api";
import ClassApi from "./components/class/ClassApi";
import ProductApi from "./components/class/ProductApi";
import TokenApi from "./components/function/TokenApi";
import UserApi from "./components/function/UserApi";
import FetchApi from "./components/function/FetchApi";

function App() {
  return (
    <div>
      {/* <Api /> */}
      {/* <ClassApi /> */}
      {/* <ProductApi /> */}
      {/* <UserApi /> */}
      <FetchApi/>
      {/* <TokenApi/> */}
    </div>
  );
}

export default App;
