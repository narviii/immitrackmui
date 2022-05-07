import TelegramLoginButton from 'react-telegram-login';
import { useEffect } from 'react'
import Button from '@mui/material/Button';
const BOT_NAME = process.env.NEXT_PUBLIC_BOT_NAME


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

    console.log(BOT_NAME)

    return (
        <div>
            {!user ?
                <TelegramLoginButton dataOnauth={(res) => handleTelegramResponse(res, setUser)} botName={BOT_NAME} />
                :
                <LogoutButton setUser={setUser} />}
        </div>
    )
}

