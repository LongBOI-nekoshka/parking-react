import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { history } from "./store/appstore";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const History = () => {
    const [hist,] = useRecoilState(history);
    const [histClone, setClone] = useState();

    useState(() => {
        let clone = [...hist];
        setClone(clone.map((data,key) => {
            let cloneAgain = [...data];
            cloneAgain.id = key;
            return cloneAgain;
        }))
    },[]); 
    return (
        <Box height={1000} width={1000}>
            <DataGrid
                 columns={[
                     {
                         field: 'parkSize',
                         headerName: 'Park Size',
                     },
                     {
                         field: 'parkNumber',
                         headerName: 'Park Number',
                     },
                     {
                         field: 'plateNumber',
                         headerName: 'Plate Number',
                     },
                     {
                         field: 'dateStart',
                         headerName: 'Time Started',
                     },
                     {
                         field: 'dateEnd',
                         headerName: 'Time Ended',
                     },
                 ]}
                 rows={histClone}
            />
        </Box>
    );
}

export default History;