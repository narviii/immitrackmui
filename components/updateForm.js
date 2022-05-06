import React from "react";
import { useState, useEffect } from "react";
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
import { useFormik } from 'formik';
import updateRecordHelper from "../helpers/updateRecord";
import axios from "axios";
import UpdateButton from "./updateButton";


function findVac(vacs, biometry_place) {
    return vacs.find(elem => elem.label === biometry_place)
}

export default function UpdateForm({ user, mutate }) {
    
    useEffect(() => {
        if (!user) return
        axios.get('/api/getRecords', { params: { id: user.id } }).
            then((res) => {

                if (!res.data) return
                formik.setFieldValue('applied', res.data.applied ? new Date(res.data.applied) : null)
                formik.setFieldValue('biometry', res.data.biometry ? new Date(res.data.biometry) : null)
                formik.setFieldValue('biometry_place', res.data.biometry_place ? vacs.find(elem => elem.label === res.data.biometry_place) : null)
                formik.setFieldValue('approved', res.data.approved ? new Date(res.data.approved) : null)
                formik.setFieldValue('passport_submited', res.data.passport_submited ? new Date(res.data.passport_submited) : null)
                formik.setFieldValue('country', res.data.country ? countries.find(elem => elem.label == res.data.country) : null)
                formik.setFieldValue('revieved', res.data.revieved ? new Date(res.data.revieved) : null)
            })
            .catch((err) => console.log(err))



    }, [user])

    const [updateStatus, setUpdateStatus] = useState("ready")

    const formik = useFormik({
        initialValues: {
            applied: null,
            biometry: null,
            biometry_place: null,
            approved: null,
            passport_submited: null,
            country: null,
            revieved: null,
        },
        onSubmit: (values) => {
            //console.log(mutate)
            setUpdateStatus("loading")
            updateRecordHelper(values, setUpdateStatus,mutate)
        },
    })
    //console.log(updateStatus)
    return (
        <Container sx={{ marginTop: "10px" }} maxWidth="lg">
            <Paper sx={{ padding: "15px", display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Add or edit your record
                </Typography>
                <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                    {user?.username}
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date applied"
                        value={formik.values.applied}
                        onChange={(val) => { formik.setFieldValue('applied', val) }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="biometry-date"
                        label="Biometry date"
                        value={formik.values.biometry}
                        onChange={(val) => { formik.setFieldValue('biometry', val) }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <Autocomplete
                    value={formik.values.biometry_place}
                    onChange={(e, val) => { formik.setFieldValue('biometry_place', val) }}
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
                        value={formik.values.approved}
                        onChange={(val) => { formik.setFieldValue('approved', val) }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id="pasport-submitted"
                        label="Passport submitted"
                        value={formik.values.passport_submited}
                        onChange={(val) => { formik.setFieldValue('passport_submited', val) }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>

                <Autocomplete
                    value={formik.values.country}
                    onChange={(e, val) => { formik.setFieldValue('country', val) }}
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
                        value={formik.values.revieved}
                        onChange={(val) => { formik.setFieldValue('revieved', val) }}
                        renderInput={(params) => <TextField sx={{ marginTop: "10px" }} {...params} />}
                    />
                </LocalizationProvider>
                <UpdateButton submit={formik.handleSubmit} status={updateStatus} user={user} />
            </Paper>

        </Container>
    )
}