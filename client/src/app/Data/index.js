import React from 'react'
import { Icon } from '@iconify/react';

export const header = [];

export const login = [
    { 
        title: "Welcome to TradesMen! Please login.", url: "/login",
        form: [
        //     {label: "Name", name: "name", type: "text", placeholder: "Enter your name",
        //     rules : {
        //         required: 'name is required',
        //         pattern: {
        //             value: /^[a-zA-Z]+$/,
        //             message: 'Only alphabets are allowed',
        //         }
        //     }
        // },
            {label: "Email", name: "email", type: "text", placeholder: "Enter your email",
            rules : {
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                }
            }
        },
            {label: "Password", name: "password", type: "password", placeholder: "Enter your password",
            rules : {
                required: 'Password is required',
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                }
            }
        },
        ]
    }
]

export const signup = [
    { 
        title: "Welcome to TradesMen! Please Sign Up.", url: "/signup",
        form: [
            {label: "First Name", name: "firstName", type: "text", placeholder: "Enter your firstName",
            rules : {
                required: 'firstName is required',
                pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Only alphabets are allowed',
                }
            }
        },
        {label: "Last Name", name: "lastName", type: "text", placeholder: "Enter your lastName",
        rules : {
            required: 'lastName is required',
            pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Only alphabets are allowed',
            }
        }
    },
            {label: "Email", name: "email", type: "text", placeholder: "Enter your email",
            rules : {
                required: 'Email is required',
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                }
            }
        },
            {label: "Password", name: "password", type: "password", placeholder: "Enter your password",
            rules : {
                required: 'Password is required',
                minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                }
            }
        },
        {label: "Phone Number", name: "phoneNumber", type: "number", placeholder: "Enter your phone number",
        rules : {
            required: 'phone number is required',
            pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid phone number format',
            }
        }
    },
    {label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Enter your password",
    rules : {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password does not match',
        }
    }
},
        ]
    }
]


export const otps = [
    {
        title: "OTP verification code",
        para: 'We have sent a 6 digit verification code to you provided phone number',
        type: "text",
    }
]