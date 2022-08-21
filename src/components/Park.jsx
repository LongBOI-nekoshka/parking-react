import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useRecoilState,useRecoilValue } from "recoil";
import ParkCarDialog from "./ParkCarDialog";
import ParkingSpace from "./ParkingSpace";
import { parkedCars, availalbePark } from "./store/appstore";
import UnparkCarDialog from "./UpparkCarDialog";

const Park = () => {
    const parked = useRecoilValue(parkedCars)
    const available = useRecoilValue(availalbePark)
    const [openCarDialog, setOpenCarDialog] = useState(false);
    const [upParkCarDialog, setUnParkCarDialog] = useState(false);

    return (
        <Box>
            <ParkCarDialog open={openCarDialog} setOpen={setOpenCarDialog}/>
            <UnparkCarDialog open={upParkCarDialog} setOpen={setUnParkCarDialog}/>
            <Button variant="outlined" onClick={() => setOpenCarDialog(true)}>
                Park A car
            </Button>
            <Button variant="outlined" onClick={() => setUnParkCarDialog(true)}>
                Unpark A Car
            </Button>
            <Button onClick={() => console.log(available)}>
                Available
            </Button>
            <Button onClick={() => console.log(parked)}>
                Parked
            </Button>
            <ParkingSpace space={1}/>
        </Box>
    );
};

export default Park;