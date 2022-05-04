import TelegramLoginButton from 'react-telegram-login';
import { useEffect } from 'react'
import Button from '@mui/material/Button';

function handleTelegramResponse(res, setUser) {
    localStorage.removeItem('userToken')
    localStorage.setItem("userToken", JSON.stringify(res))
    setUser(res)
};

function LogoutButton({ setUser }) {
    return (
        <Button color="inherit" onClick={() => {
            setUser(null)
            localStorage.removeItem('userToken')
        }}
            >
            Logout
        </Button>
    )
}

export default function Login({ user, setUser }) {
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userToken")))
    }, [])

    return (
        <div>
            {!user ?
                <TelegramLoginButton dataOnauth={(res) => handleTelegramResponse(res, setUser)} botName="timeBigle_bot" />
                :
                <LogoutButton setUser={setUser} />}
        </div>
    )
}

