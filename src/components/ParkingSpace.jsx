import { Avatar, Badge, Box, Dialog, DialogContent, Divider, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { parkedCars, availalbePark } from "./store/appstore";
import { useRecoilState,useRecoilValue } from "recoil";
import { CheckCircleOutline, DoNotDisturb } from "@mui/icons-material";

const ParkingSpace = (props) => {
    const { space } = props;
    const parked = useRecoilValue(parkedCars)
    const available = useRecoilValue(availalbePark)

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#239441',
            },
            children: name,
        };
    }

    return (
        <Box>
            <Dialog>
                <DialogContent>

                </DialogContent>
            </Dialog>
            <Stack direction='column' spacing={1} >
                <Stack direction='row' spacing={2}>
                    {
                        available.filter((data) =>{
                            return data.parkingNumber <= 7
                        }).map((data) => {
                            return (
                                <Badge  
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        data.isAvalable ? <CheckCircleOutline/> : <DoNotDisturb/>
                                    }
                                >
                                    <IconButton>
                                        <Avatar {...stringAvatar(data.parkingNumber)}/>
                                    </IconButton>
                                </Badge>
                            );
                        })
                    }
                </Stack>
                <Stack direction='row' spacing={2}>
                    {
                        available.filter((data) =>{
                            return data.parkingNumber > 7 && data.parkingNumber <= 14
                        }).map((data) => {
                            return (
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            data.isAvalable ? <CheckCircleOutline/> : <DoNotDisturb/>
                                        }
                                    >
                                        <IconButton>
                                            <Avatar {...stringAvatar(data.parkingNumber)}/>
                                        </IconButton>
                                    </Badge>
                            );
                        })
                    }
                </Stack>
                <Stack direction='row' spacing={2}>
                    {
                        available.filter((data) =>{
                            return data.parkingNumber > 14 && data.parkingNumber <= 21
                        }).map((data) => {
                            return (
                                <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    data.isAvalable ? <CheckCircleOutline/> : <DoNotDisturb/>
                                }
                                >
                                    <IconButton>
                                        <Avatar {...stringAvatar(data.parkingNumber)}/>
                                    </IconButton>
                                </Badge>
                            );
                        })
                    }
                </Stack>
            </Stack>
        </Box>
    );
};

export default ParkingSpace;