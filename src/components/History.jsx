import { Button, Dialog, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { history } from "./store/appstore";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { format } from "date-fns/esm";
import InfoIcon from '@mui/icons-material/Info';
import { Link, useNavigate } from "react-router-dom";

const History = () => {
    const [hist,] = useRecoilState(history);
    const [histClone, setClone] = useState();
    const [openDialog, setDialog] = useState(false);
    const [details, setDetails] = useState(false);
    const navigate = useNavigate();

    useState(() => {
        let clone = [...hist];
        setClone(clone.map((data,key) => {
            let cloneAgain = {...data};
            cloneAgain.id = key;
            return cloneAgain;
        }))
    },[]); 
    return (
        <Box height={1000} width={1000}>
            <Button onClick={()=>navigate('/park')}>
                Goto Park
            </Button>
            <Dialog open={openDialog} onClose={() => setDialog(false)}>
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="caption">
                            Penalty:
                            {
                                details.details
                            }
                        </Typography>
                        <Typography variant="caption">
                            Penalty Multiplier:
                            {
                                details.penaltyMultiplier
                            }
                        </Typography>
                        <Typography variant="caption">
                            Regular:
                            {
                                details.regular
                            }
                        </Typography>
                        <Typography variant="caption">
                            Regular Multiplier
                            {
                                details.regularMultiplier
                            }
                        </Typography>
                        <Typography variant="caption">
                            3 hour fee
                            {
                                details.threehourRule
                            }
                        </Typography>
                        <Typography variant="caption">
                            <strong>
                                Total:
                                {
                                    details.total
                                }
                            </strong>
                        </Typography>
                    </Stack>
                </DialogContent>
            </Dialog>
            <DataGrid
                sx={{
                    color:'white'
                }}
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
                        valueGetter: (params) => format(params.row.dateStart,'MMMM dd, yyyy HH:ii:ss'),
                        width:200
                     },
                     {
                        field: 'dateEnd',
                        headerName: 'Time Ended',
                        valueGetter: (params) => format(params.row.dateEnd,'MMMM dd, yyyy HH:ii:ss'),
                        width:200

                     },
                     {
                        field: 'id',
                        headerName: 'Details',
                        renderCell: (params) => (
                            <IconButton onClick={() => {
                                setDialog(true),
                                setDetails(params.row.receipt)
                            }}>
                                <InfoIcon/>
                            </IconButton>
                        ),
                        width:100
                     }
                 ]}
                 rows={histClone}
            />
        </Box>
    );
}

export default History;