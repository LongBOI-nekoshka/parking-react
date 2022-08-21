import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Stack } from "@mui/system";
import { useState } from "react";
import { availalbePark, parkedCars, history } from "./store/appstore";
import { useRecoilState } from "recoil";
import { differenceInMinutes } from "date-fns";

const ParkCarDialog = (props) => {
    const { open, setOpen } = props
    const [size, setSize] = useState('s');
    const [plateNumber, setPlateNumber] = useState('');
    const [entrance, setEntrance] = useState(1);
    const [available, setAvalable] = useRecoilState(availalbePark);
    const [hist,] = useRecoilState(history);
    const [parked, setParked] = useRecoilState(parkedCars);
    const [disable, setDisable] = useState(false);
    
    const save = () => {
        let cloneAvailable = [...available];
        let canBeParked = available.filter((data) => {
            switch(size) {
                case 's':
                    return data.isAvalable
                case 'm':
                    return data.isAvalable && (data.size == 'LP' || data.size == 'MP')
                case 'l':
                    return data.isAvalable && data.size == 'LP'
            } 
        });
        cloneAvailable = cloneAvailable.map((data) => {
            let changes = {...data};
            if(canBeParked[canBeParked.length - 1].parkingNumber == data.parkingNumber) {
                Object.defineProperty(changes, "isAvalable", {
                    value: false,
                    enumerable: true,
                    configurable: true,
                });
            }
            return changes;
        })
        setAvalable(cloneAvailable);
        let checkIfHour = hist.filter((data) => {
            return data.plateNumber == plateNumber && Math.round(differenceInMinutes(data.endDate,new Date() /60)) < 1
        })
        console.log(checkIfHour);
        setParked(parked => [...parked,{
            entrance:entrance,
            plateNumber:plateNumber,
            parkNumber:canBeParked[canBeParked.length - 1].parkingNumber,
            parkSize:canBeParked[canBeParked.length - 1].size,
            dateStart: new Date(),
            dateEnd: null
        }]);
        handleClose();
        // let shortest = sortByShortest(canBeParked)
    };
    
    // const sortByShortest = (array) => {
    //     let arrayClone = [...array]
    //     arrayClone.sort((a,b) => {

    //     })
    // };

    const handleClose = () => {
        setOpen(false)
        setSize('s')
        setPlateNumber('')
        setEntrance(1)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Car Details</DialogTitle>
            <DialogContent>
                <Stack spacing={1} direction='column'>
                        <br/>
                    <FormControl fullWidth>
                        <InputLabel id="size">
                            Vehicle Size 
                        </InputLabel>
                        <Select 
                            label='Vehicle Size' 
                            labelId="size"
                            value={size}
                            onChange={(event) => {
                                setSize(event.target.value)
                            }}
                        >
                            <MenuItem value='s'>Small</MenuItem>
                            <MenuItem value='m'>Medium</MenuItem>
                            <MenuItem value='l'>Large</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        label='Plate Number' 
                        value={plateNumber} 
                        onChange={(event) =>{
                            setPlateNumber(event.target.value)
                            setDisable(parked.filter((data) => data.plateNumber == event.target.value).length >= 1)
                        }}
                    />
                    <TextField 
                        type='number' 
                        label='Entrance'
                        value={entrance}
                        onChange={(event) => {
                            if(event.target.value <= 3  && event.target.value >= 1 ) {
                                setEntrance(event.target.value)
                            }
                    }}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={save} variant='outlined' disabled={
                    disable || plateNumber == ''
                }>
                    Save
                </Button>
                <Button color='secondary' onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ParkCarDialog;