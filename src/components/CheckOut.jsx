import { useState } from "react";
import axios from "axios";

function CheckOut({ base_url }) {
  //驗證api
  const checkout_api = `${base_url}/users/checkout`;
  //驗證狀態
  const [tokenInput, setTokenInput] = useState("");
  //提示訊息
  const [msg, setMsg] = useState("");

  //事件
  const handleCheckOutValue = (e) => {
    setTokenInput(e.target.value);
  };

  //進行驗證
  const handleCheckOutClick = async () => {
    try {
      //要記得夾帶驗證資訊
      const res = await axios.get(`${checkout_api}`, {
        headers: { Authorization: tokenInput },
      });
      console.log(res.data);
      setMsg(`
      狀態：${res.status}
      ${res.data.nickname} 恭喜你 驗證成功！
      UID:${res.data.uid}
      `);
      setTokenInput("");
    } catch (err) {
      console.log(err);
      setMsg(`
      錯誤狀態：${err.response.data.message}
      請重新輸入正確的token進行驗證
      `);
      setTokenInput("");
    }
  };

  return (
    <div>
      <h3>Check Out 驗證</h3>
      <div className="checkOut-form mt-3">
        {/*input:token欄位*/}
        <div className="checkOut-email ">
          <label htmlFor="checkOut-email" className="form-label text-start">
            驗證:
          </label>
          <input
            className="form-control"
            type="text"
            id="checkOut-email"
            placeholder="請輸入有效的token進行驗證"
            required
            value={tokenInput}
            onChange={handleCheckOutValue}
          />
        </div>
        {/*驗證按鈕*/}
        <button
          type="button"
          className="btn btn-info mt-3"
          onClick={handleCheckOutClick}
        >
          驗證
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
    </div>
  );
}

export default CheckOut;
