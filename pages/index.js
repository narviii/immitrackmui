import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Login from '../components/telegramLogin';
import Container from '@mui/material/Container';
import useSWR, { useSWRConfig } from 'swr'
import revive from '../helpers/revive'
import UpdateForm from '../components/updateForm';
import Table from '../components/entriesTable';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
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
              CUAET tracker
            </Typography>
            <Login user={user} setUser={setUser} />
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="xl">
        <Paper sx={{mt:4,mb:2, padding: "15px" }}>
          
          <Typography variant="h5">
            Это трекер для отслеживания сроков получения виз CUAET участниками чатов о иммиграции в 🇨🇦Канаду для 🇺🇦украинцев.

          </Typography>
          <Typography variant="h6">
            Как это работает?
          </Typography>
          <Typography variant="body">
            Вы авторизируетесь телеграмом и вносите ваши данные. К страничке можно возвращаться много раз и править вашу запись (по мере прохождения вашего процесса). Данные других участников можно посмотреть в таблице, применив к ней фильтры.
          </Typography>
        </Paper>
      </Container>
      <UpdateForm user={user} mutate={mutate} />

      <Container sx={{ marginTop: "20px" }} maxWidth="xl">


        <Table data={data} />
        <Typography sx={{mb:4,mt:2}}>Исходная Google Doc таблица находится <Link href="https://docs.google.com/spreadsheets/d/1sgUPbogDw7V4rakrBSJ07_YLhvVem79rtGq7Xj__ec0/edit#gid=0"> вот тут</Link>. Сайт синхронизируется с ней раз в день.</Typography>

      </Container>
    </React.Fragment>
  );
}


