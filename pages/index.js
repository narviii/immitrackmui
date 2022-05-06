import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Login from '../components/telegramLogin';
import Container from '@mui/material/Container';
import useSWR,{ useSWRConfig } from 'swr'
import { DataGrid } from '@mui/x-data-grid';
import revive from '../helpers/revive'
import columns from '../data/columns'
import UpdateForm from '../components/updateForm';

const fetcher = (...args) => fetch(...args)
  .then(res => res.json())
  .then(res => {
    const a = JSON.parse(JSON.stringify(res), revive)
    return a
  })



export default function Index() {
  const [user, setUser] = useState()
  const [pageSize, setPageSize] = React.useState(5);
  const { data, error } = useSWR('/api/getRecords', fetcher)
  const { mutate } = useSWRConfig()
  //console.log(mutate)
  if (!data) return "Loading"
  if(error) return "Error!"
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
      <UpdateForm user={user} mutate={mutate}/>

      <Container sx={{ marginTop: "20px" }} maxWidth="lg">

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
