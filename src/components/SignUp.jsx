import { useState } from "react";
import axios from "axios";

function SignUp({ base_url }) {
  //signUp_api
  const signUp_api = `${base_url}/users/sign_up`;
  //設定註冊欄位的狀態：物件
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  //設定相關訊息狀態
  const [msg, setMsg] = useState("");
  //存取使用者輸入input欄位資料
  const handleInputValue = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  //註冊
  const handleSignUpClick = async () => {
    console.log(signUpData);
    try {
      const res = await axios.post(`${signUp_api}`, signUpData);
      console.log(res.data);
      //將回傳的相關訊息顯示到畫面上
      setMsg(`${signUpData.nickname}恭喜你，註冊成功！
        狀態： ${res.status}
        UID:  ${res.data.uid}
      `);
      //清空欄位資料
      setSignUpData({
        email: "",
        password: "",
        nickname: "",
      });
    } catch (error) {
      console.log(error);
      //將回傳的相關訊息顯示到畫面上
      setMsg(`${signUpData.nickname}抱歉，註冊失敗喔！
        狀態： ${error.response.data.message}
      `);
      //清空欄位資料
      setSignUpData({
        email: "",
        password: "",
        nickname: "",
      });
    }
  };
  return (
    <div>
      <h3>Sign up 註冊</h3>
      <div className="signUp-form mt-3">
        {/*input:email欄位*/}
        <div className="signUp-email ">
          <label htmlFor="signUp-email" className="form-label text-start">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="signUp-email"
            placeholder="example@gmail.com"
            required
            value={signUpData.email}
            onChange={handleInputValue}
          />
        </div>
        {/*input:password欄位*/}
        <div className="signUp-password mt-3">
          <label htmlFor="signUp-password" className="form-label">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="signUp-password"
            placeholder="請輸入至少7個字元長度的密碼"
            required
            value={signUpData.password}
            onChange={handleInputValue}
          />
        </div>
        {/*input:nickname欄位*/}
        <div className="signUp-nickName mt-3">
          <label htmlFor="signUp-nickName" className="form-label">
            nickname:
          </label>
          <input
            className="form-control"
            type="text"
            name="nickname"
            id="signUp-nickName"
            placeholder="請輸入你的nickname"
            required
            value={signUpData.nickname}
            onChange={handleInputValue}
          />
        </div>
        {/*註冊按鈕*/}
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleSignUpClick}
        >
          註冊
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

export default SignUp;
