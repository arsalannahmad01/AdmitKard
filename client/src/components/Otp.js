import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Otp.css";
import OtpIcon from "../images/Otp-Icon.png";
import CellularIcon from "../images/CellularIcon.png";
import BatteryIcon from "../images/Battery.png";
import WifiIcon from "../images/Wifi.png";
import axios from "axios";

const Otp = () => {
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [inputStatus, setInputStatus] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setPhoneNumber(location.state?.data);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours + ":" + minutes;
  };

  const [time, setTime] = useState(getCurrentTime());

  const moveToNext = (e, nextInput, prevInput) => {
    if (prevInput === null) setInputStatus("");

    if (e.target.value.length >= e.target.maxLength) {
      if (nextInput) {
        document.getElementById(nextInput).focus();
      }
    } else if (prevInput && e.target.value.length === 0)
      document.getElementById(prevInput).focus();
  };

  const addOtp = (e) => {
    setOtp(otp + e.target.value);
  };

  const resendOtp = async () => {
    if (phoneNumber) {
      await axios
        .post(`http://localhost:8080/api/v1/send-otp`, { phoneNumber })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyOtp = async () => {
    await axios.post(`http://localhost:8080/api/v1/verify-otp`, {
      phoneNumber,
      otp,
    }).then((res) => {
      console.log(res.data.message)
      navigate('/welcome')
    }).catch((error) => {
      console.log(error.response.data.message);
      if(error.response.data.message === "Invalid OTP") {
        setInputStatus('invalid');
        setOtp("")
        alert(error.response.data.message)
      }
    })
  };

  return (
    <div className="otp">
      <div className="otp-header">
        <div className="time">{time}</div>
        <div className="header-icons">
          <img className="icon" src={CellularIcon} />
          <img className="icon" src={WifiIcon} />
          <img className="icon" src={BatteryIcon} />
        </div>
      </div>
      <img className="otp-icon" src={OtpIcon} width={132} height={138} />
      <div className="verify">Please verify Mobile number</div>

      <div className="otp-msg">An OTP is sent to {phoneNumber}</div>
      <Link className="change-number" to={"/"}>
        Change Phone Number
      </Link>

      <div className="otp-input">
        <input
          className={inputStatus}
          type="text"
          id="1"
          maxLength="1"
          onInput={(e) => moveToNext(e, "2", null)}
          onChange={(e) => addOtp(e)}
        />
        <input
          className={inputStatus}
          type="text"
          id="2"
          maxLength="1"
          onInput={(e) => moveToNext(e, "3", "1")}
          onChange={(e) => addOtp(e)}
        />
        <input
          className={inputStatus}
          type="text"
          id="3"
          maxLength="1"
          onInput={(e) => moveToNext(e, "4", "2")}
          onChange={(e) => addOtp(e)}
        />
        <input
          className={inputStatus}
          type="text"
          id="4"
          maxLength="1"
          onInput={(e) => moveToNext(e, "verify", "3")}
          onChange={(e) => addOtp(e)}
        />
      </div>

      <div className="resend">
        Didn’t receive the code?
        <Link
          style={{ color: "#F7B348", textDecoration: "none" }}
          onClick={resendOtp}
        >
          {" "}
          Resend
        </Link>
        <button id="verify" className="verify-btn" onClick={verifyOtp}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default Otp;
