import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { VERIFY_CODE } from '../graphql/Mutation';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const [Email,setEmail]=useState('')
    const [output,setoutput]=useState('')
     
    const [verifyCode, { data, loading, error }] = useMutation(VERIFY_CODE);

    const navigate=useNavigate();

    const handleSubmit = async(e) => {

        e.preventDefault();


        try{
            const response = await verifyCode({
                variables: {
                  email: Email,
                  code: otp, 
                },
              });
              console.log(response.data.verifyCode.message);
              setoutput(response?.data?.verifyCode?.message)
              if(response?.data?.verifyCode?.message=="Sign-up confirmed successfully")
                  {
                      navigate('/signin')
                  }
  

        }
        catch(err)
        {

        }



    };


    const Resendotphandle=()=>{
        navigate("/resendotp")
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '100px 100px' }}>
            <h2 style={{ textAlign: "center" }}>OTP VERIFY</h2>
            <div>
                <p>EMAIL</p>
                <input 
                    type="text" 
                    value={Email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div>
                <p>OTP</p>
                <input 
                    type="number" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                />
            </div>
            <div>
                <input type="submit" value="VERIFY" />
                <button onClick={Resendotphandle}>RESEND OTP</button>
            </div>
        </form>
    );
};

export default Verify;
