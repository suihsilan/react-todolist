import { useState } from "react";
import axios from "axios";

function SignOut({ base_url, token, setToken }) {
  //網址
  const sidnOut_api = `${base_url}/users/sign_out`;
  //訊息狀態
  const [msg, setMsg] = useState("");

  const handleSignOut = async () => {
    console.log("登出");
    //要提供驗證
    try {
      const res = await axios.post(
        `${sidnOut_api}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data);
      setMsg(`
      ${res.data.message} ，歡迎隨時回來！
      `);
      setToken("");
      document.cookie = "token=; expires=;";
    } catch (err) {
      setMsg(`
      ${err.response.data.message} 
      `);
    }
  };
  return (
    <>
      <h2>登出</h2>
      <div className="d-grid">
        <button
          type="button"
          className="btn btn-warning mt-3"
          onClick={handleSignOut}
        >
          登出
        </button>
        <div
          className="alert alert-warning my-4 ml-3"
          role="alert"
          style={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}
        >
          執行結果：
          <br />
          {msg}
        </div>
      </div>
    </>
  );
}

export default SignOut;
