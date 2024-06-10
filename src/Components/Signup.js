import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../graphql/Mutation'; // Assuming you have defined the mutation query in a separate file

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });


    const [output,setoutput]=useState("")


    const navigate=useNavigate()

    const [createUserMutation, { loading, error }] = useMutation(CREATE_USER);

    const onSubmit = async (data) => {
        try {
            const { name, email, password } = data;
            const response = await createUserMutation({
                variables: {
                  CreateUserInput1: { name, email, password }
                }
            });
            console.log(response?.data?.createUsers?.message);
            setoutput(response.data.message)
            if(response?.data?.createUsers?.message=="User created successfully")
                {
                    navigate('/Verify')
                }
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '100px 100px' }}>
            <h2 style={{textAlign:"center"}}>SIGN UP</h2>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="name">Name</label>
                <input type="text" {...register('name')} style={{ width: '100%', padding: '5px' }} />
                {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
            </div>
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
            <button type="submit" style={{ marginLeft:"130px",backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }} disabled={loading}>Sign Up</button>
            <div>{output}</div>
            {/* {error && <span style={{ color: 'red' }}>Error: Failed to create user</span>} */}
        </form>
    );
};

export default Signup;
