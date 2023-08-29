import { useState } from "react";
import axios from "axios";

function SignIn({ base_url, setToken }) {
  //signIn_api
  const signIn_api = `${base_url}/users/sign_in`;
  //設定登入欄位的資料狀態
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  //設定登入後的訊息提示
  const [msg, setMsg] = useState("");
  //設計onChange事件將使用者寫入input值存取到狀態中
  const handleInputValue = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };
  //處理點擊登入後的流程
  const handleSignInClick = async () => {
    // console.log(signInData);
    try {
      const res = await axios.post(`${signIn_api}`, signInData);
      // console.log(res);
      //從res.data中取得一個名為token的值，然後將這個token儲存到瀏覽器的 Cookie 中，並設定 Cookie 的過期時間為明天。讓我逐步解釋這段程式碼的功能：
      const { token } = res.data;
      //這一行程式碼建立了一個表示目前日期和時間的Date物件，然後將其儲存在變數tomorrow中。
      const tommorrow = new Date();
      //這一行程式碼透過tomorrow.getDate() + 1來計算明天的日期，並將其設定為tomorrow物件的日期部分。這樣，tomorrow將代表明天的日期。
      tommorrow.setDate(tommorrow.getDate() + 1);
      //將一個名為token的 Cookie 設定到瀏覽器中。它使用token變數的值作為 Cookie 的內容，並使用tomorrow.toUTCString()來設定 Cookie 的過期時間為明天。這樣，該 Cookie 將在明天過期，瀏覽器會自動移除它。
      document.cookie = `token=${token};expires=${tommorrow.toUTCString()}`;
      //再將token存入到狀態中
      setToken(token);
      setMsg(`
        ${res.data.nickname} 恭喜你，登入成功！
        token: ${token}
      `);
      setSignInData({
        email: "",
        password: "",
      });
    } catch (err) {
      setMsg(`
        抱歉，登入失敗喔！
        錯誤訊息: ${err.response.data.message}
      `);
      setSignInData({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div>
      <h3>Sign In 登入</h3>
      <div className="signIn-form mt-3">
        {/*input:email欄位*/}
        <div className="signIn-email ">
          <label htmlFor="signIn-email" className="form-label text-start">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="signIn-email"
            placeholder="example@gmail.com"
            required
            value={signInData.email}
            onChange={handleInputValue}
          />
        </div>
        {/*input:password欄位*/}
        <div className="signIn-password mt-3">
          <label htmlFor="signIn-password" className="form-label">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="signIn-password"
            placeholder="請輸入至少7個字元長度的密碼"
            required
            value={signInData.password}
            onChange={handleInputValue}
          />
        </div>
        {/*註冊按鈕*/}
        <button
          type="button"
          className="btn btn-info mt-3"
          onClick={handleSignInClick}
        >
          登入
        </button>
        {/*註冊後顯示的訊息*/}
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
    </div>
  );
}

export default SignIn;
