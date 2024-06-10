import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import {PERFORM_SIGNIN} from "../graphql/Mutation"

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

    const [performSignIn, { data, loading, error }] = useMutation(PERFORM_SIGNIN);



    const onSubmit = async (data) => {
        console.log(data)
        const {email,password}=data;
        try{
            const response = await performSignIn({
                variables: {
                  email: email, 
                  password: password,
                },
              });
              console.log(response?.data?.performsignin);
        

        }
        catch(err)
        {
            console.log(err)
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '100px 100px' }}>
            <h2 style={{textAlign:"center"}}>LOGIN</h2>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="email">Email</label>
                <input type="email" {...register('email')} style={{ width: '100%', padding: '5px' }} />
                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="password">Password</label>
                <input type="text" {...register('password')} style={{ width: '100%', padding: '5px' }} />
                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>
            <button type="submit" style={{ marginLeft:"130px",backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }} disabled={loading}>LOGIN</button>
            {error && <span style={{ color: 'red' }}>Error: Failed to create user</span>}
        </form>
    );
};

export default Signin;
