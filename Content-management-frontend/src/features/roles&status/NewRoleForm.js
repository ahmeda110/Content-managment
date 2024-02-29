import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTaskMutation } from "./tasksApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

import * as React from 'react';
import { Typography, TextField, Select, Box, MenuItem, FormControl, InputLabel } from "@mui/material";

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const NewTaskForm = ({ users }) => {

    const [addNewTask, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTaskMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/tasks')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTaskClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTask({ user: userId, title, text })
        }
    }

    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
            },
        },
    };
    const options = users.map(user => {
        return (
            <MenuItem
                sx={{ minWidth: 120, minHeight: 80 }}
                key={user.id}
                value={user.id}
            > {user.username}</MenuItem >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''


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
            <form
            style={{
                paddingTop: "20px"
            }}
            >

                <Typography variant='h6' component='div'>Create New Task</Typography>
                <TextField
                required
                id="outlined-required"
                label="Title"
                value={title}
                onChange={onTitleChanged} />

                <div
                style={{
                    paddingTop: "20px",
                    width: "30em"
                }}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-multiline-flexible"
                        label="Text"
                        multiline
                        rows={6}
                        value={text}
                        onChange={onTextChanged}
                    />
                </div>
                <div
                style={{
                    paddingTop: "20px"
                }}>
                    <FormControl sx={{ minWidth: 210}}>
                        <InputLabel>Assigned To</InputLabel>
                        <Select
                        label="Assigned To"
                        id="username"
                        name="username"
                        autoWidth
                        value={userId}
                        onChange={onUserIdChanged}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                maxHeight: 180,
                                width: 210,
                                },
                            },
                        }}
                        >
                            {options}
                        </Select>
                    </FormControl>
                </div>
  
                
                <Stack className="logoutButton">
                    <Button
                    variant="contained"
                    color="success"
                    title="Save"
                    disabled={!canSave}
                    onClick={onSaveTaskClicked}
                    >
                        Create
                    </Button>
                </Stack>

            </form>
        </Box>
    )

    return content
}

export default NewTaskForm
