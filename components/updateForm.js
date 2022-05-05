import React from "react";
import { useState } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { vacs } from '../data/vacs';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Paper from '@mui/material/Paper';
import { countries } from "../data/countries";
import Button from '@mui/material/Button';

export default function UpdateForm({ user }) {
    const [biometryPlace, setBiometryPlace] = useState(null)
    const [applied, setApplied] = useState(null);
    const [biometry, setBiometry] = useState(null);
    const [approved, setApproved] = useState(null);
    const [sumbitted, setSumbitted] = useState(null);
    const [country, setCountry] = useState(null)
    const [recieved, setRecieved] = useState(null)




    return (
        <Container sx={{ marginTop: "10px" }} maxWidth="lg">
            <Paper sx={{ padding: "15px",display:"flex",flexDirection:"column" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Add or edit your record
                </Typography>
                <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                    {user?.username}
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date applied"
                        value={applied}
                        onChange={(newValue) => {
                            setApplied(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="biometry-date"
                        label="Biometry date"
                        value={biometry}
                        onChange={(newValue) => {
                            setBiometry(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <Autocomplete
                    value={biometryPlace}
                    onChange={(event, newValue) => {
                        setBiometryPlace(newValue);
                    }}
                    disablePortal
                    id="biometry-place-select"
                    options={vacs}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} label="Biometry place" />}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="visa-approved"
                        label="Visa approved"
                        value={approved}
                        onChange={(newValue) => {
                            setApproved(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="pasport-submitted"
                        label="Passport submitted"
                        value={sumbitted}
                        onChange={(newValue) => {
                            setSumbitted(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px"}} {...params} />}
                    />
                </LocalizationProvider>

                <Autocomplete
                    value={country}
                    onChange={(event, newValue) => {
                        setCountry(newValue);
                    }}
                    disablePortal
                    id="country-select"
                    options={countries}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} label="Country" />}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="visa-recieved"
                        label="Visa recieved"
                        value={recieved}
                        onChange={(newValue) => {
                            setRecieved(newValue);
                        }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>
                <Button sx={{marginTop:"10px"}} variant="contained">Update</Button>
            </Paper>

        </Container>
    )
}