import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Login from '../components/telegramLogin';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import useSWR from 'swr'
import { DataGrid } from '@mui/x-data-grid';
let dayjs = require('dayjs')

function revive(name, value) {
  if (typeof value === "string" && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value)) {
      return new Date(value);
  }
  return value;
}

//const fetcher = url => axios.get(url).then(res => res.data)
const fetcher = (...args) => fetch(...args)
  .then(res => res.json())
  .then(res => {
    const a = JSON.parse(JSON.stringify(res),revive)
    return a
  })








const columns = [
  {
    field: 'username',
    headerName: 'Username',
    width: 150
  },
  {
    field: 'applied',
    type:"date",
    headerName: 'Date applied',
    width: 120
  },
  {
    field: 'biometry',
    type:"date",
    headerName: 'Biometry date',
    width: 120
  },
  {
    field: 'biometry_place',
    headerName: 'Biometry place',
    width: 150
  },
  {
    field: 'approved',
    type:"date",
    headerName: 'Visa approved',
    width: 120
  },
  {
    field: 'passport_submited',
    type:"date",
    headerName: 'Passport submitted',
    width: 120
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 150
  },
  {
    field: 'revieved',
    type:"date",
    headerName: 'Visa recieved',
    width: 120
  },
];

export default function Index() {
  const [user, setUser] = useState()
  const [pageSize, setPageSize] = React.useState(5);
  const { data, error } = useSWR('/api/getRecords', fetcher)
  if (!data) return "Loading"
  //console.log(data)
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Immigration tracker
            </Typography>
            <Login user={user} setUser={setUser} />
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">

        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />


      </Container>
    </React.Fragment>
  );
}
