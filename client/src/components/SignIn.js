import React, {useState} from 'react'
import './SignIn.css'
import AdmitKard from '../images/AK_logo.png'
import InputPhone from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

  const [phoneNumber, setPhoneNumber] = useState(null)

  const navigate = useNavigate()

  const sendOtp = async() => {    

    const formattedNumber = `+${phoneNumber}`


    if(phoneNumber) {
      await axios.post(`http://localhost:8080/api/v1/send-otp`, {phoneNumber:formattedNumber}).then((res) => {
        console.log(res)
        navigate('/otp', {state:{data:`+${phoneNumber}`}})
      }).catch((error) => {
        console.log(error)
      })
    }
  }


  return (
    <div className='signin' >
        <img className='signin-img' src={AdmitKard} width={264} height={50} />
        <div className='signin-msg' >Welcome Back</div>
        <div className='login-msg' >Please sign in your account</div>

        <InputPhone className='phone' placeholder='7896781234'
          value={phoneNumber}
          country={'in'}
          specialLabel={'Enter Phone Number'}
          inputStyle={{
            borderColor: "#FFD37D",
          }}

          containerStyle={{
            specialLabel:{left:"45px"}
          }}

          onChange={phone => setPhoneNumber(phone)}

        />

        <div className='sms-msg' >We will send you a one time SMS message.<br/>Charges may apply.</div>

        <button className='send-btn' onClick={sendOtp} >Sign In with OTP</button>
    </div>
  )
}

export default SignIn