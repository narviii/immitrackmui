import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function UpdateButton({ submit, status,user }) {
    if (!user) return (
        <Typography sx={{ marginTop: "10px" }} variant="body">Чтоб добавить или изменить запись, пожалуйста, авторизуйтесь.</Typography>
    )
    switch (status) {
        case "ready":
            return (
                <Button onClick={submit} sx={{ marginTop: "10px" }} variant="contained">Update</Button>
            )
        case "loading":
            return <Button disabled sx={{ marginTop: "10px" }} variant="contained">Updating...</Button>
        case "sucess":
            return <Button color="success" sx={{ marginTop: "10px" }} variant="contained">Success!!</Button>
        case "error":
            return <Button color="error" sx={{ marginTop: "10px" }} variant="contained">Failed...</Button>
    }

}