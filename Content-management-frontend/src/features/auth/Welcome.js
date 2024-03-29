import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { useSendLogoutMutation } from '../auth/authApiSlice'

const Welcome = () => {
    const navigate = useNavigate()
    const { username, isManager, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess, navigate])

    const logOut = () => {
        sendLogout()
        navigate('/login')
    }

    const logoutButton = (
        <Button
        variant="contained"
        color="error"
        title="Logout"
        onClick={logOut}>
            Log Out
        </Button>
    )


    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <section className="welcome">
            <p className={errClass}>{error?.data?.message}</p>

            <h1>Welcome, {username}!</h1>

            <p>{today}</p>

            <Stack direction="row" spacing={2} className="logoutButton">
                {logoutButton}
            </Stack>
        </section>
    )

    return content
}
export default Welcome