import { PanoramaVertical } from '@mui/icons-material';

let dayjs = require('dayjs')
let duration = require('dayjs/plugin/duration')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(duration)
import 'dayjs/locale/ru'
dayjs.locale('ru')




function dateHumanize(param) {
    if (param.value) {
        return dayjs(param.value).format('DD MMM YY')
    } else return null
}

function durationHumanize(param) {

    if (param.value) {
        return dayjs.duration(param.value, "milliseconds").humanize();
    } else return null


}


const columns = [
    {
        field: 'username',
        align: "center",
        headerAlign: "center",
        headerName: 'Username',
        description: 'Имя пользователя',
        width: 170,
    },
    {
        field: 'applied',
        align: "center",
        headerAlign: "center",
        type: "date",
        headerName: 'Applied',
        description: 'Какого числа поданно заявление на визу',
        width: 120,
        valueFormatter: dateHumanize
    },
    {
        field: 'biometry',
        align: "center",
        headerAlign: "center",
        type: "date",
        headerName: 'Biometry',
        description: 'Какого числа была сдана биометрия',
        width: 120,
        valueFormatter: dateHumanize

    },
    {
        field: 'biometry_place',
        headerAlign: "center",
        align: "center",
        headerName: 'Biometry place',
        description: 'Где была сдана биометрия',
        width: 150
    },
    {
        field: 'approved',
        headerAlign: "center",
        align: "center",
        type: "date",
        headerName: 'Approval date',
        description: 'Какого числа одобрили визу',
        width: 120,
        valueFormatter: dateHumanize

    },
    {
        field: 'approvedIn',
        headerAlign: "center",
        align: "center",
        type: "date",
        headerName: 'Approved in',
        description: 'За сколько дней одобрили визу',
        width: 120,
        valueGetter: (params) => {
            const value = dayjs(params.row.approved).diff(dayjs(params.row.biometry))
            if (value) {
                return value
            } else return null
        },
        valueFormatter: durationHumanize

    },
    {
        field: 'passport_submited',
        headerAlign: "center",
        align: "center",
        type: "date",
        headerName: 'Submission date',
        description: 'Какого числа отправили паспорт на вклейку визы',
        width: 150,
        valueFormatter: dateHumanize

    },
    {
        field: 'country',
        headerAlign: "center",
        align: "center",
        headerName: 'Submission country',
        description: 'В какой стране отправили паспорт на вклейку визы',
        width: 200
    },
    {
        field: 'recieved',
        headerAlign: "center",
        align: "center",
        type: "date",
        headerName: 'Visa recieved',
        description: 'Какого числа получили паспорт назад',
        width: 120,
        valueFormatter: dateHumanize

    },
    {
        field: 'daysForVisa',
        headerAlign: "center",
        align: "center",
        type: "date",
        headerName: 'Days for visa',
        description: 'Сколь прошло от подачи паспорта на вклейку до получения обратно',
        width: 120,
        valueGetter: (params) => {
            const value = dayjs(params.row.recieved).diff(dayjs(params.row.passport_submited))
            if (value) {
                return value
            } else return null
        },
        valueFormatter: durationHumanize
    },
    
];

export default columns