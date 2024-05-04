import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSendLogoutMutation } from '../auth/authApiSlice';

const Welcome = () => {
    const navigate = useNavigate();
    const { username, isManager, isAdmin } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update time every second

        return () => clearInterval(timerID); // Clean up on unmount
    }, []);

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/login');
    }, [isSuccess, navigate]);

    const logOut = () => {
        sendLogout();
        navigate('/login');
    };

    const logoutButton = (
        <Button
            variant="contained"
            color="error"
            title="Logout"
            onClick={logOut}
        >
            Log Out
        </Button>
    );

    const errClass = isError ? "errmsg" : "offscreen";

    return (
        <section className="welcome">
            <p className={errClass}>{error?.data?.message}</p>

            <h1>Welcome, {username}!</h1>

            <p>{currentTime.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}</p>

            <Stack direction="row" spacing={2} className="logoutButton">
                {logoutButton}
            </Stack>
        </section>
    );
};

export default Welcome;
