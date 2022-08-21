import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { parkedCars, availalbePark, history } from "./store/appstore";

const UnparkCarDialog = (props) => {
    const {open, setOpen} = props;
    const [endDate,setEndDate] = useState(new Date());
    const [parked, setParked] = useRecoilState(parkedCars)
    const [available, setAvailalbe] = useRecoilState(availalbePark);
    const [selected, setSelected] = useState('');
    
    const handeClose = () => {
        setOpen(false);
        setEndDate(new Date());
    };

    const save = () => {

    };

    return (
        <Dialog
            open={open}    
            onClose={handeClose}    
        >
            <DialogTitle>
                Unpark car
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}  >
                        <DateTimePicker
                            label="End Date"
                            value={endDate}
                            onChange={(value) => setEndDate(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <FormControl>
                        <InputLabel id='cars'>
                            Unpark car
                        </InputLabel>
                        <Select 
                            labelId='cars' 
                            label='Unpark car'
                            onChange={(event) => selected(event.target.value)}
                            value={selected}
                        >
                            {
                                parked.map((data) => {
                                    return (
                                        <MenuItem
                                            value={data.parkNumber}
                                        >
                                            {
                                                'Park Number:'+data.parkNumber
                                            }
                                            <br/>
                                            {
                                                'Plate No.:'+data.plateNumber
                                            }
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={save}>
                    Save
                </Button>
                <Button >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UnparkCarDialog;