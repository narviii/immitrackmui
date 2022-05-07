import { DataGrid } from '@mui/x-data-grid';
import columns from '../data/columns'
import { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


export default function EntriesTabke({ data }) {
    const [pageSize, setPageSize] = useState(5);


    const skeleton = <Box sx={{ height: 300, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        {Array.from(Array(10).keys()).map((key) => <Skeleton key={key} animation="wave" />)}
    </Box>

    return (
        <div>
            {data ? <DataGrid
                autoHeight
                rows={data}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
            /> : skeleton}
        </div>
    )
}

