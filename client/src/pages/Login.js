import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { loginRequest, profileRequest } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { socket } from "../contexts/SocketContext";

export function Login() {
    const router = useHistory();
    const { setLoggedIn, setUser, token, setIsOnline } = useAuth();

    const { register, handleSubmit } = useForm();

    async function handleLogin(data) {
        await loginRequest(data)
            .then((res) => {
                let tokens = res.data.data;

                // save tokens locally
                localStorage.setItem("token", tokens.access_token);

                return tokens;
            })
            .then(async (tokens) => {
                // get user
                let user = await profileRequest(tokens.access_token);

                // save to localstorage
                // localStorage.setItem("user", JSON.stringify(user.data.data));
                setLoggedIn(true);
                setUser(user.data.data);
                setIsOnline(true);

                socket.emit("setOnline", { user_id: user.data.data.user_id });

                // notify and redirect
                toast.success("You are now logged in.");
                router.push("/");
            })
            .catch((err) => {
                toast.error(err.message);
                console.log(err);
            });
    }

    return (
        <>
            {token ? null : (
                <div className='d-flex flex-column align-items-center bg-primary justify-content-center vh-100'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className='mb-3 text-white'>
                        Login to your account
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
                            onSubmit={handleSubmit(handleLogin)}>
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
                                Login
                            </Button>
                            <Link
                                to='/signup'
                                className='text-center text-decoration-none'>
                                Signup
                            </Link>
                        </Form>
                    </motion.div>
                </div>
            )}
        </>
    );
}

export default Login;
