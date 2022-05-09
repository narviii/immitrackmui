import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Login from '../components/telegramLogin';
import Container from '@mui/material/Container';
import useSWR, { useSWRConfig } from 'swr'
import { DataGrid } from '@mui/x-data-grid';
import revive from '../helpers/revive'
import UpdateForm from '../components/updateForm';
import Table from '../components/entriesTable';
import Paper from '@mui/material/Paper';

const fetcher = (...args) => fetch(...args)
  .then(res => res.json())
  .then(res => {
    const a = JSON.parse(JSON.stringify(res), revive)
    return a
  })



export default function Index({ entries }) {
  const [user, setUser] = useState()
  const { data, error } = useSWR('/api/getRecords', fetcher)
  const { mutate } = useSWRConfig()
  if (error) return "Error!"
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Трекер для отслеживание срок получения виз CUAET.
            </Typography>
            <Login user={user} setUser={setUser} />
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        <Paper sx={{ padding: "15px" }}>
          
          <Typography variant="h5">
            Это трекер для отслеживания сроков получения виз CUAET участниками чатов о иммиграции в 🇨🇦Канаду для 🇺🇦украинцев.

          </Typography>
          <Typography variant="h6">
            Как это работает?
          </Typography>
          <Typography variant="body">
            Вы авторизируетесь телеграмом и вносите ваши данные. К страничке можно возвращаться много раз и править вашу запись(по мере прохождения вашего процесса). Данные других участников можно посмотреть в таблице, применив к ней фильтры.
          </Typography>
        </Paper>
      </Container>
      <UpdateForm user={user} mutate={mutate} />

      <Container sx={{ marginTop: "20px" }} maxWidth="lg">


        <Table data={data} />

      </Container>
    </React.Fragment>
  );
}


