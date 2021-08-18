import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { signupRequest } from "../api/auth";
import { motion } from "framer-motion";

function Signup() {
    const token = localStorage.getItem("token");
    const router = useHistory();
    const { register, handleSubmit } = useForm();

    async function handleSignup(data) {
        await signupRequest(data)
            .then(() => {
                toast.success("Signup successful. Please login.");
                router.push("/login");
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    useEffect(() => {
        if (token) {
            router.push("/");
        }
    }, [token, router]);

    return (
        <>
            {token ? null : (
                <div className='d-flex flex-column align-items-center bg-primary justify-content-center vh-100'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className='mb-3 text-white'>
                        Create a new account
                    </motion.h2>
                    <motion.div
                        initial={{
                            y: -40,
                        }}
                        animate={{
                            y: 0,
                        }}
                        transition={{
                            ease: "easeInOut",
                            duration: 0.5,
                        }}>
                        <Form
                            className='rounded border bg-white shadow-lg d-flex justify-content-center flex-column px-4 py-5'
                            style={{
                                minWidth: "500px",
                                minHeight: "300px",
                            }}
                            autoComplete='off'
                            onSubmit={handleSubmit(handleSignup)}>
                            <div className='d-flex w-100 mb-3 gap-2 justify-content-between'>
                                <Form.Group className='w-100'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        {...register("first_name")}
                                        type='text'
                                        placeholder='First Name'
                                        required
                                        className='bg-light'
                                    />
                                </Form.Group>
                                <Form.Group className='w-100'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        {...register("last_name")}
                                        type='text'
                                        placeholder='Last Name'
                                        required
                                        className='bg-light'
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    {...register("email")}
                                    className='w-100 bg-light'
                                    type='email'
                                    placeholder='Email Address'
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    {...register("password")}
                                    type='password'
                                    placeholder='Password'
                                    required
                                    className='bg-light'
                                />
                            </Form.Group>
                            <Button
                                variant='primary'
                                className='mb-3'
                                type='submit'>
                                Signup
                            </Button>
                            <Link
                                to='/login'
                                className='text-center text-decoration-none'>
                                Login
                            </Link>
                        </Form>
                    </motion.div>
                </div>
            )}
        </>
    );
}

export default Signup;
