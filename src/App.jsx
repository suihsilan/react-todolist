import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CheckOut from "./components/checkOut";

function App() {
  const base_url = "https://todolist-api.hexschool.io";
  //token狀態
  const [token, setToken] = useState("");
  return (
    <>
      <h1>第三週作業</h1>
      <div className="row row-cols-2">
        <div className="col p-4">
          <SignUp base_url={base_url} />
        </div>
        <div className="col p-4">
          <SignIn base_url={base_url} setToken={setToken} />
        </div>
        <div className="col p-4">
          <CheckOut base_url={base_url} />
        </div>
        <div className="col p-4">
          <SignOut base_url={base_url} token={token} />
        </div>
      </div>
    </>
  );
}

export default App;
