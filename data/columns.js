let dayjs = require('dayjs')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

function anonimize(param) {
    //console.log(param.id)
    //const hash = require('crypto').createHash('md5').update(param).digest("hex")
    const config = {
        dictionaries: [adjectives, animals],
        separator: ' ',
        seed: param.id,
        style: 'capital'
    };
    return uniqueNamesGenerator(config)
}


function dateFormat(param) {
    if (param.value) {
        return dayjs(param.value).format('DD MMM YY')
    } else return null
}



const columns = [
    {
        field: 'username',
        headerName: 'TG username',
        description: 'Имя пользователя в Telegram.  Автоматически подтягивается при авторизации.',
        width: 170,
        valueFormatter:anonimize
    },
    {
        field: 'applied',
        type: "date",
        headerName: 'Applied',
        description: 'Какого числа подались на визу?',
        width: 120,
        valueFormatter: dateFormat
    },
    {
        field: 'biometry',
        type: "date",
        headerName: 'Biometry',
        description: 'Какого числа сдали биометрию?',
        width: 120,
        valueFormatter: dateFormat

    },
    {
        field: 'biometry_place',
        headerName: 'Biometry place',
        description: 'Где сдавали биометрию?',
        width: 150
    },
    {
        field: 'approved',
        type: "date",
        headerName: 'Approval date',
        description: 'Какого числа вам одобрили визу?',
        width: 120,
        valueFormatter: dateFormat

    },
    {
        field: 'passport_submited',
        type: "date",
        headerName: 'Submission date',
        description: 'Какого числа отправили паспорт на вклейку визы?',
        width: 150,
        valueFormatter: dateFormat

    },
    {
        field: 'country',
        headerName: 'Submission country',
        description: 'В какой стране отправили паспорт на вклейку визы?',
        width: 200
    },
    {
        field: 'revieved',
        type: "date",
        headerName: 'Visa recieved',
        description: 'Какого числа получили паспорт назад?',
        width: 120,
        valueFormatter: dateFormat

    },
];

export default columns