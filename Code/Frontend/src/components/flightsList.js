import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';

class Flights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightsList:[1,2,3]
        }
    }
    render() { 
        return (
            <Container>
            {
                    this.state.flightsList.map((flight, index) => { 
                        return (
                            <div>
                            <Paper sx={{ p: 2, margin: 'auto',  flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                              <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                  Standard license
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  Full resolution 1920x1080 • JPEG
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ID: 1030114
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                  Remove
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1" component="div">
                                $19.00
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                      <br></br>
                      </div>
                        )
                })
            }</Container>
            
          );
    }
}
 
export default Flights;

