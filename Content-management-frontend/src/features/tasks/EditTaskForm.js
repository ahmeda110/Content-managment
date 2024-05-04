import { useState, useEffect } from "react"
import { useUpdateTaskMutation, useDeleteTaskMutation } from "./tasksApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

import { Typography, TextField, Select, Box, MenuItem, FormControl, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const EditTaskForm = ({ task, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateTask, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTaskMutation()

    const [deleteTask, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteTaskMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(task.title)
    const [text, setText] = useState(task.text)
    const [completed, setCompleted] = useState(task.completed)
    const [userId, setUserId] = useState(task.user)
    
    const [status, setStatus] = useState(task.status)
    const [keywords, setKeywords] = useState(task.keywords)
    const [sKeywords, setsKeywords] = useState(task.sKeywords)
    const [country, setCountry] = useState(task.country)
    const [webUrl, setWebsite] = useState(task.webUrl)
    const [dueDate, setDate] = useState(task.dueDate)
    //const [userId, setUserId] = useState(users[0].id)

    

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setKeywords('')
            setsKeywords('')
            setCountry('')
            setWebsite('')
            setDate('')
            setUserId('')
            navigate('/dash/tasks')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const onKeywordsChanged = e => setKeywords(e.target.value)
    const onsKeywordsChanged = e => setsKeywords(e.target.value)
    const onCountryChanged = e => setCountry(e.target.value)
    const onWebsiteChanged = e => setWebsite(e.target.value)
    //const onDateChanged = e => setDate(e.target.value)
    const onStatusChanged = e => setStatus(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTaskClicked = async (e) => {
        if (canSave) {
            await updateTask({ id: task.id, user: userId, title, text, completed })
        }
    }

    const onDeleteTaskClicked = async () => {
        await deleteTask({ id: task.id })
    }

    const created = new Date(task.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(task.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteTaskClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

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
            onSubmit={e => e.preventDefault()}
            style={{
                paddingTop: "20px"
            }}
            >
                <Typography variant='h6' component='div'>Edit Task</Typography>

                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Title"
                    value={title}
                    onChange={onTitleChanged} />
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Text"
                    value={text}
                    onChange={onTextChanged} />
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Keywords"
                    value={keywords}
                    onChange={onKeywordsChanged} />
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Semantic Keywords"
                    value={sKeywords}
                    onChange={onsKeywordsChanged} />
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Website"
                    value={webUrl}
                    onChange={onWebsiteChanged} />
                </div>

                <Stack className="logoutButton">
                    <Button
                    variant="contained"
                    color="success"
                    title="Save"
                    disabled={!canSave}
                    onClick={onSaveTaskClicked}
                    >
                        Save
                    </Button>
                    <Button
                    style={{marginTop: '20px'}}
                    variant="contained"
                    color="error"
                    title="Delete"
                    onClick={onDeleteTaskClicked}
                    >
                        Delete
                    </Button>
                </Stack>

            </form>
        </Box>
        /*
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Task #{task.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveTaskClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="task-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="task-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="task-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="task-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="task-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="task-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="task-username">
                            ASSIGNED TO:</label>
                        <select
                            id="task-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
        */
    )

    return content
}

export default EditTaskForm