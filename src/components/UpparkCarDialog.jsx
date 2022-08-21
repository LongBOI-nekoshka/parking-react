import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from "date-fns";
import { differenceInMinutes } from "date-fns/esm";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { parkedCars, availalbePark, history } from "./store/appstore";

const UnparkCarDialog = (props) => {
    const {open, setOpen} = props;
    const [endDate,setEndDate] = useState();
    const [parked, setParked] = useRecoilState(parkedCars)
    const [available, setAvailalbe] = useRecoilState(availalbePark);
    const [, setHistory] = useRecoilState(history)
    const [selected, setSelected] = useState('');
    const [unparkSummary, setSummary] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setEndDate();
        setSelected('')
        setSummary(null);
    };

    const save = () => {
        let parkedClone = [...parked];
        let indexClonePark = parkedClone.findIndex((data) => {
            return data.parkNumber == selected
        });
        let cloneinfo = {...parkedClone[indexClonePark]};
        cloneinfo.dateEnd = endDate ?? new Date();
        let cloneAvailable = [...available];
        let penaltyMultiplier = 0
        let multiplier = 0;
        let hoursRendered = Math.round(differenceInMinutes(cloneinfo.dateEnd,cloneinfo.dateStart)/60);
        cloneinfo.receipt = {};
        cloneinfo.receipt.threehourRule = 40;
        if(hoursRendered > 24) {
            penaltyMultiplier = Math.round(hoursRendered/24);
            multiplier =  hoursRendered - (24 * penaltyMultiplier - 1)
        }

        if(hoursRendered > 3)  {
            multiplier = hoursRendered-3;
        }

        switch(cloneinfo.parkSize) {
            case 'SP':
                cloneinfo.receipt.regular = 20
                break;
            case 'MP':
                cloneinfo.receipt.regular = 60
                break;
            case 'LP':
                cloneinfo.receipt.regular = 100
                break;
        }
        cloneinfo.receipt.dateStart = cloneinfo.dateStart
        cloneinfo.receipt.dateEnd = cloneinfo.dateEnd
        cloneinfo.receipt.penalty = 5000
        cloneinfo.receipt.penaltyMultiplier = penaltyMultiplier
        cloneinfo.receipt.regularMultiplier = multiplier
        let total = cloneinfo.receipt.threehourRule + (5000 * penaltyMultiplier) + (cloneinfo.receipt.regularMultiplier * cloneinfo.receipt.regular );
        cloneinfo.receipt.total = total
        setSummary(cloneinfo.receipt);
        setAvailalbe(cloneAvailable.map((data) => {
            let cloneData = {...data}
            if(cloneData.parkingNumber == selected) {
                cloneData.isAvalable = true;
            }
            return cloneData;
        }))
        setHistory(parkHistory => [...parkHistory,cloneinfo])
        parkedClone.splice(indexClonePark,1)
        setParked(parkedClone)
        setSelected('')
    };

    return (
        <Dialog
            open={open}    
            onClose={handleClose}    
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
                            value={endDate ?? new Date()}
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
                            onChange={(event) => setSelected(event.target.value)}
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
                    {
                        unparkSummary ?  <>
                        <Typography variant="caption">
                            Time Started:
                            {
                                format(unparkSummary.dateStart,'MMMM dd, yyyy HH:ii:ss')
                            }
                        </Typography>
                        <Typography variant="caption">
                            Time ended:
                            {
                                format(unparkSummary.dateEnd,'MMMM dd, yyyy HH:ii:ss')
                            }
                        </Typography>
                        <Typography variant="caption">
                            Penalty Rate:
                            {
                                unparkSummary.penalty
                            }
                        </Typography>
                        <Typography variant="caption">
                            Penalty Multiplier:
                            {
                                unparkSummary.penaltyMultiplier
                            }
                        </Typography>
                        <Typography variant="caption">
                            Regular rate:
                            {
                                unparkSummary.regular
                            }
                        </Typography>
                        <Typography variant="caption">
                            Regular Multiplier:
                            {
                                unparkSummary.regularMultiplier
                            }
                        </Typography>
                        <Typography variant="caption">
                            Total:
                            {
                                unparkSummary.total
                            }
                        </Typography>
                        </>
                        :undefined
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={save} disabled={selected == ''}>
                    Unpark
                </Button>
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UnparkCarDialog;