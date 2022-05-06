import Button from '@mui/material/Button';


export default function UpdateButton({ submit, status,user }) {
    if (!user) return (
        <Button sx={{ marginTop: "10px" }} variant="outlined">Please log in</Button>
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