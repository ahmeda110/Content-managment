import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"


import * as React from 'react';
import { Typography, TextField, Select, Box, MenuItem, FormControl, InputLabel } from "@mui/material";

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const AdminForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const navigate = useNavigate()

    //const [title, setTitle] = useState('')
    //const [text, setText] = useState('')
    //const [userId, setUserId] = useState(users[0].id)

    //const [username, setUsername] = useState(user.username)
    //const [validUsername, setValidUsername] = useState(false)
    //const [email, setEmail] = useState('')
    //const [validEmail, setValidEmail] = useState(false)
    //const [password, setPassword] = useState('')
    //const [validPassword, setValidPassword] = useState(false)
    //const [roles, setRoles] = useState(user.roles)
    console.log(user)
    const [userRoles, setUserRoles] = useState(user.userRoles)
    const [validRoles, setValidRoles] = useState(false)
    const [status, setStatus] = useState(user.userRoles)
    const [validStatus, setValidStatus] = useState(false)
    //const [active, setActive] = useState(user.active)
    //const [admin, setAdmin] = useState(false)

    useEffect(() => {
        if (isSuccess) {
            //setTitle('')
            //setText('')
            //setUserId('')
            setUserRoles('')
            setStatus('')
            navigate('/dash/admin')
        }
    }, [isSuccess, navigate])

    
    const onRolesChanged = e => setUserRoles(e.target.value)
    const onStatusChanged = e => setStatus(e.target.value)
    /*
    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    */
    
    const canSave = [ userRoles ].every(Boolean) && !isLoading
    

    //const canSave = [title, text, userId].every(Boolean) && !isLoading

    /*
    const onSaveRoleClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewRole({ user: userId, title, text })
        }
    }
    */
    const onSaveUserClicked = async (e) => {
        await updateUser({ userRoles })
    }

    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
            },
        },
    };
    /*
    const options = users.map(user => {
        return (
            <MenuItem
                sx={{ minWidth: 120, minHeight: 80 }}
                key={user.id}
                value={user.id}
            > {user.username}</MenuItem >
        )
    })
    */
    const roleOptions = Object.values(userRoles).map(role => {
        return (
            <option
                key={userRoles}
                value={userRoles}

            > {userRoles}</option >
        )
    })
    const statusOptions = Object.values(status).map(role => {
        return (
            <option
                key={status}
                value={status}

            > {status}</option >
        )
    })

    /*
    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    */


    const content = (
        <Box
            pl={'1%'}
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
        >
            <form style={{ paddingTop: "20px" }}>
                <Typography variant='h6' component='div'>Add New Role</Typography>
                {/*add tag input*/}
                <TextField id="outlined-basic" label="Roles" variant="outlined" />

                <div
                style={{
                    paddingTop: "20px",
                    width: "30em"
                }}>
                    
                    <Typography variant='h6' component='div'>Add New Status</Typography>
                    <TextField id="outlined-basic" label="Status" variant="outlined" />
                </div>

                <div
                style={{
                    paddingTop: "20px"
                }}>
                    <FormControl sx={{ minWidth: 210 }}>
                        <InputLabel>Assigned Statuses</InputLabel>
                        <Select
                        label="Assigned Statuses"
                        autoWidth
                        //value={userId}
                        //onChange={onUserIdChanged}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                maxHeight: 180,
                                width: 210,
                                },
                            },
                        }}
                        >
                            {statusOptions}
                        </Select>
                    </FormControl>
                </div>
  
                
                <Stack className="logoutButton">
                    <Button
                    variant="contained"
                    color="success"
                    title="Save"
                    disabled={!canSave}
                    onClick={onSaveUserClicked}
                    >
                        Save
                    </Button>
                </Stack>

            </form>
        </Box>
    )

    return content
}

export default AdminForm
