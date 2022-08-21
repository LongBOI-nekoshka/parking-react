import { Button, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [timeToday, setTimeToday] = useState(format(new Date(),'pp'));
    const navigate = useNavigate();
    
    useEffect(() => {
        setInterval(() => setTimeToday(format(new Date(),'pp')), 1000);
    },[]);

    return (
        <Grid 
            container 
            justifyContent='center' 
            alignItems='center' 
            spacing={2}
            direction='column'
        >
            <Grid item>
                <Typography variant='h5'>
                    Today is{" "}
                    <strong>
                        {format(new Date(), 'MMMM d, yyyy')}
                    </strong>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='h4' sx={{
                    fontFamily: 'Courier'
                }}>
                    {timeToday}
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    variant='outlined'
                    onClick={() => navigate('/park')}
                >
                    Start
                </Button>
            </Grid>
        </Grid>
    );
};

export default Home;