import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

import { Typography, TextField, Select, Box, MenuItem, FormControl, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'


const USER_REGEX = /^[A-z]{3,20}$/
const MAIL_REGEX = /^[A-z@.]{3,64}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const CONT_REGEX = /^[0-9]{1,4}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [admin, setAdmin] = useState(false)
    const [contract, setContract] = useState('')
    const [validContract, setValidContract] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidEmail(MAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password]) 

    useEffect(() => {
        setValidContract(CONT_REGEX.test(contract))
    }, [contract]) 

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setEmail('')
            setPassword('')
            setRoles([])
            setContract('')
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onContractChanged = e => setContract(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active, email, contract })
        } else {
            await updateUser({ id: user.id, username, roles, active, email, contract })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        //<p className={errClass}>{errContent}</p>

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
                <Typography variant='h6' component='div'>Edit User</Typography>

                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Username [3-20 letters]"
                    value={username}
                    onChange={onUsernameChanged} />
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Email"
                    value={email}
                    onChange={onEmailChanged} />
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    label="Contract (number)"
                    value={contract}
                    onChange={onContractChanged} />
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Password: (4-12 chars incl. !@#$%)"
                    variant="outlined"
                    value={password}
                    onChange={onPasswordChanged} />
                </div>
                
                {/*
                <div
                style={{
                    paddingTop: "20px"
                }}>
                    <FormControl sx={{ minWidth: 210}}>
                        <InputLabel>Assigned Roles</InputLabel>
                        <Select
                        label="Assigned Roles"
                        id="roles"
                        name="roles"
                        multiple
                        value={roles}
                        onChange={handleChange}
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
                

                <div
                style={{
                    paddingTop: "20px"
                }}>
                    <Tooltip title="An admin will be able to create users, only they can see their own created users." arrow>
                        <FormControlLabel control={<Checkbox 
                        checked={admin}
                        onChange={onAdminChanged}
                        inputProps={{ 'aria-label': 'controlled' }} />} label="is Admin?" />
                    </Tooltip>                    
                    
                </div>
                */}
  
                
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
                    <Button
                    style={{marginTop: '20px'}}
                    variant="contained"
                    color="error"
                    title="Delete"
                    onClick={onDeleteUserClicked}
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
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />
                <label className="form__label" htmlFor="email">
                    Email: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
        */
    )

    return content
}
export default EditUserForm