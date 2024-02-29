import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'


import * as React from 'react';
import { Typography, TextField, Select, Box, MenuItem, FormControl, InputLabel, OutlinedInput, Tooltip } from "@mui/material";

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Button from '@mui/material/Button'

import Stack from '@mui/material/Stack'


const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current?.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            console.log(accessToken, username, password)
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('UnauthorizedJJJD3D');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current?.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const canSave = [username, password].every(Boolean) && !isLoading

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <Box
        pl={'1%'}
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
            
        }}
        noValidate
        autoComplete="off"
        >
            <form
            style={{
                paddingTop: "20px"
            }}>
                <Typography variant='h2' component='div'>Dashboard Login</Typography>

                <div
                style={{
                    paddingTop: "20px"
                }}>
                <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Username"
                    value={username}
                    onChange={handleUserInput} />
                </div>

                <div
                style={{
                    paddingTop: "20px"
                }}>
                <TextField
                    required
                    id="outlined-required"
                    type="password"
                    variant="outlined"
                    label="Password"
                    value={password}
                    onChange={handlePwdInput} />
                </div>

                <div
                style={{
                    paddingTop: "20px"
                }}>
                    <FormControlLabel control={<Checkbox 
                    id="persist"
                    checked={persist}
                    onChange={handleToggle}
                    inputProps={{ 'aria-label': 'controlled' }} />} label="Trust this device" />
                </div>

                <Stack style={{ position: "absolute", bottom: "50px", marginLeft: "100px"}}>
                    <Button
                    variant="contained"
                    color="success"
                    title="Login"
                    disabled={!canSave}
                    onClick={handleSubmit}
                    >
                        Log In
                    </Button>
                </Stack>
            </form>
            
            
            
            
        </Box>
        /*
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>


                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
        */
    )

    return content
}
export default Login