import axios from "axios";

export default function updateRecordHelper(data, setUpdateStatus,mutate) {
    //console.log(mutate)

    const token = localStorage.getItem("userToken") //JSON.stringify(user)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    axios.post('/api/updateRecord', data, config)
        .then((res) => {
            //console.log(res)
            setUpdateStatus("sucess")
            //mutate('/api/getRecords')
            setTimeout(() => setUpdateStatus("ready"), 1000)
        }).catch((err) => {
            console.log(res)
            setUpdateStatus("error")
            setTimeout(() => setUpdateStatus("ready"), 3000)
        })


}