let dayjs = require('dayjs')


function dateFormat(param) {
    if (param.value) {
      return dayjs(param.value).format('DD MMM YY')
    }else return null
  }

const columns = [
    {
        field: 'username',
        headerName: 'Username',
        width: 150
    },
    {
        field: 'applied',
        type: "date",
        headerName: 'Date applied',
        width: 120,
        valueFormatter: dateFormat
    },
    {
        field: 'biometry',
        type: "date",
        headerName: 'Biometry date',
        width: 120,
        valueFormatter: dateFormat

    },
    {
        field: 'biometry_place',
        headerName: 'Biometry place',
        width: 150
    },
    {
        field: 'approved',
        type: "date",
        headerName: 'Visa approved',
        width: 120,
        valueFormatter: dateFormat

    },
    {
        field: 'passport_submited',
        type: "date",
        headerName: 'Passport submitted',
        width: 150,
        valueFormatter: dateFormat

    },
    {
        field: 'country',
        headerName: 'Submission country',
        width: 200
    },
    {
        field: 'revieved',
        type: "date",
        headerName: 'Visa recieved',
        width: 120,
        valueFormatter: dateFormat

    },
];

export default columns