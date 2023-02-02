import {Form} from "react-router-dom";
import {Box} from "@mui/material";
import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
interface submitData {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email : string;

}

const validationSchema = yup.object().shape({
    firstname: yup.string().required('Firstname is required'),
    lastname: yup.string().required('Lastname is required'),
    //Username has to be unique
    //-> checked during fetch call
    username: yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});
const Register = () =>{

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<submitData>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: submitData) => {
        console.log(JSON.stringify(data, null, 2));
    };
    return (
        <Box className={"regBox"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        {...register('firstname')}
                        className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.firstname?.message}</div>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        {...register('lastname')}
                        className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.lastname?.message}</div>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        {...register('username')}
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="btn btn-warning float-right"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </Box>
    );
}

export default Register;