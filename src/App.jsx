// import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";

function App() {
  const base_url = "https://todolist-api.hexschool.io";
  return (
    <>
      <h1>第三週作業</h1>
      <div className="row row-cols-2">
        <div className="col p-4">
          <SignUp base_url={base_url} />
        </div>
      </div>
    </>
  );
}

export default App;
