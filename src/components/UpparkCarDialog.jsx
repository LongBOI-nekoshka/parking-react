import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Stack } from "@mui/system";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
 
const UnparkCarDialog = (props) => {
    const {open, setOpen} = props;


    return (
        <Dialog>
            <DialogTitle>
                Unpark car
            </DialogTitle>
            <DialogContent>
                <DateTime/>
            </DialogContent>
            <DialogActions>
                <Button>
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