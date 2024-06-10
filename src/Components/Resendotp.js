import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESEND_CODE } from "../graphql/Mutation";
import { useMatch, useNavigate } from "react-router-dom";


const Resendotp = (props) => {

    const [output,setoutput]=useState('')

    const navigate=useNavigate()

    const [Email,setEmail]=useState("")


    const [ResendOTp, { loading, error }] = useMutation(RESEND_CODE);


    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(Email)
        try {
            const response = await ResendOTp({
                variables: {
                  email:Email
                }
            });
            console.log(response?.data?.resendCode?.message);
            setoutput(response?.data?.resendCode?.message)
            if(response?.data?.resendCode?.message=="Confirmation code resent successfully")
                {
                    navigate('/Verify')
                }
        } catch (err) {
            console.error('Error creating user:', err);
        }




    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '100px 100px' }}>
                <h2 style={{ textAlign: "center" }}>RESEND OTP</h2>
                <div>
                    <p>EMAIL:</p>
                    <input
                        type="text"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="SUBMIT" />
                </div>
            </form>
        </div>
    )
}

export default Resendotp;
