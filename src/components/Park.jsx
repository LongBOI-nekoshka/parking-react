import { AppBar, Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useRecoilState,useRecoilValue } from "recoil";
import ParkCarDialog from "./ParkCarDialog";
import ParkingSpace from "./ParkingSpace";
import { parkedCars, availalbePark, history } from "./store/appstore";
import UnparkCarDialog from "./UpparkCarDialog";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Park = () => {
    const [timeToday, setTimeToday] = useState(format(new Date(),'pp'));
    const parked = useRecoilValue(parkedCars)
    const available = useRecoilValue(availalbePark)
    const historytest = useRecoilValue(history)
    const [openCarDialog, setOpenCarDialog] = useState(false);
    const [upParkCarDialog, setUnParkCarDialog] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setInterval(() => setTimeToday(format(new Date(),'pp')), 1000);
    },[]);
    return (
        <Box>
            <AppBar component="nav" sx={{
                backgroundColor: '#292929'
            }}>
                <Stack justifyContent='center' alignItems='center'>
                    <Typography
                         variant='h4' sx={{
                            fontFamily: 'Courier'
                        }}
                    >
                        {
                            timeToday
                        }
                    </Typography>
                </Stack>
            </AppBar>
            <ParkCarDialog open={openCarDialog} setOpen={setOpenCarDialog}/>
            <UnparkCarDialog open={upParkCarDialog} setOpen={setUnParkCarDialog}/>
            <Stack spacing={1} direction='column' alignItems='center' justifyContent='center'>
                <Stack spacing={1} direction='row'>
                    <Button variant="outlined" onClick={() => setOpenCarDialog(true)}>
                        Park A car
                    </Button>
                    <Button variant="outlined" onClick={() => setUnParkCarDialog(true)}>
                        Unpark A Car
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/history')}>
                        View History
                    </Button>
                </Stack>
                <ParkingSpace space={1}/>
            </Stack>
            {/* <Button onClick={() => console.log(available)}>
                Available
            </Button>
            <Button onClick={() => console.log(parked)}>
                Parked
            </Button> */}
           
        </Box>
    );
};

export default Park;