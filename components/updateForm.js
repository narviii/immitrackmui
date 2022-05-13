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
import Box from '@mui/material/Box';


function findVac(vacs, biometry_place) {
    return vacs.find(elem => elem.label === biometry_place)
}

export default function UpdateForm({ user, mutate, setUser }) {

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
                formik.setFieldValue('recieved', res.data.recieved ? new Date(res.data.recieved) : null)
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
            recieved: null,
        },
        onSubmit: (values) => {
            setUpdateStatus("loading")
            updateRecordHelper(values, setUpdateStatus, mutate)
            mutate('/api/getRecords')
        },
    })
    return (
        <Container sx={{ marginTop: "10px" }} maxWidth="xl">
            <Paper sx={{ padding: "15px" }}>
                <Box sx={{ display: "block" }}>


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Добавить или редактировать вашу запись
                    </Typography>
                    <Typography variant="p" component="div" sx={{ flexGrow: 1, mb: 2 }}>
                        {user?`Здраствуйте, ${user?.username}`:"   "}
                    </Typography>


                    <Box sx={{display:"flex",flexWrap:"wrap"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Когда подались?"
                                
                                disabled={!user ? true : false}
                                value={formik.values.applied}
                                onChange={(val) => { formik.setFieldValue('applied', val) }}
                                renderInput={(params) => <TextField helperText="Дата подачи на визу." sx={{ mb: 2, mr: 2 }}  {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="biometry-date"
                                label="Когда биометрия?"
                                disabled={!user ? true : false}
                                value={formik.values.biometry}
                                onChange={(val) => { formik.setFieldValue('biometry', val) }}
                                renderInput={(params) => <TextField helperText="Дата подачи на биометрию." sx={{ mb: 2, mr: 2 }}  {...params} />}
                            />
                        </LocalizationProvider>
                        <Autocomplete
                            value={formik.values.biometry_place}
                            onChange={(e, val) => { formik.setFieldValue('biometry_place', val) }}
                            disablePortal
                            sx={{ width: 250,mr:2,mb:2 }}
                            disabled={!user ? true : false}
                            id="biometry-place-select"
                            options={vacs}
                            renderInput={(params) => <TextField helperText="Город(vac) подачи на биометрию."  {...params} label="Где сдавали биометрию?" />}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="visa-approved"
                                label="Когда одобрили?"
                                disabled={!user ? true : false}
                                value={formik.values.approved}
                                onChange={(val) => { formik.setFieldValue('approved', val) }}
                                renderInput={(params) => <TextField helperText="Дата одобрения визы" sx={{ mb: 2, mr: 2 }}  {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="pasport-submitted"
                                disabled={!user ? true : false}
                                label="Когда послали паспорт?"
                                value={formik.values.passport_submited}
                                onChange={(val) => { formik.setFieldValue('passport_submited', val) }}
                                renderInput={(params) => <TextField helperText="Дата, когда послали паспорт на вклейку." sx={{ mb: 2, mr: 2 }}  {...params} />}
                            />
                        </LocalizationProvider>
                        <Autocomplete
                            value={formik.values.country}
                            onChange={(e, val) => { formik.setFieldValue('country', val) }}
                            disablePortal
                            sx={{ width: 250,mr:2,mb:2 }}
                            id="country-select"
                            disabled={!user ? true : false}
                            options={countries}
                            renderInput={(params) => <TextField  {...params} label="Где подавались?" helperText="В какой стране подавались на визу." />}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                id="visa-recieved"
                                label="Когда получили назад?"
                                disabled={!user ? true : false}
                                value={formik.values.recieved}
                                onChange={(val) => { formik.setFieldValue('recieved', val) }}
                                renderInput={(params) => <TextField helperText="Какого числа получили паспорт обратно?" sx={{ mb: 2, mr: 2 }}  {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>

                </Box>
                <Box sx={{ display: "block" }}>
                    <UpdateButton submit={formik.handleSubmit} status={updateStatus} user={user} setUser={setUser} />
                </Box>
            </Paper>

        </Container >
    )
}