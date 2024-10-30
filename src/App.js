import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import moment from 'moment-timezone';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CssBaseline
} from '@mui/material';
import AnalogClock from './AnalogClock'; // Import the AnalogClock component
import logo from './logo.png'; // Add your logo image path here
import './App.css';

function App() {
  const [timeZones, setTimeZones] = useState([]);
  const [baseCity, setBaseCity] = useState("America/New_York");
  const [targetCity, setTargetCity] = useState("Asia/Dubai");
  const [currentTime, setCurrentTime] = useState(moment.tz(baseCity));

  // Fetching time zones dynamically
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        const cityOptions = data.map((tz) => ({
          value: tz,
          label: tz.split("/")[1] || tz,
        }));
        setTimeZones(cityOptions);
      })
      .catch((error) => console.error("Error fetching time zones:", error));
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment.tz(baseCity));
    }, 1000);
    return () => clearInterval(timer);
  }, [baseCity]);

  // Handle dropdown changes
  const handleBaseCityChange = (selectedOption) => {
    setBaseCity(selectedOption.value);
  };

  const handleTargetCityChange = (selectedOption) => {
    setTargetCity(selectedOption.value);
  };

  // Calculate target time
  const targetTime = moment.tz(currentTime.format(), targetCity);

  return (
    <Container>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#009B77' }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography variant="h6" component="div">
            World Time Clocks
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ my: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Select
              options={timeZones}
              value={timeZones.find((option) => option.value === baseCity)}
              onChange={handleBaseCityChange}
              placeholder="Select Base City..."
              isSearchable={true}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#009B77',
                }),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              options={timeZones}
              value={timeZones.find((option) => option.value === targetCity)}
              onChange={handleTargetCityChange}
              placeholder="Select Target City..."
              isSearchable={true}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#009B77',
                }),
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h4">Current Time in Selected City</Typography>
          <Typography variant="h5">{targetTime.format("HH:mm:ss")}</Typography>
        </Box>

        <AnalogClock timeZone={targetCity} /> {/* Include the Analog Clock here */}

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Main Time Zones</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>City</strong></TableCell>
                  <TableCell><strong>Current Time</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeZones.map((tz) => (
                  <TableRow key={tz.value}>
                    <TableCell>{tz.label.split("_").join(" ")}</TableCell>
                    <TableCell>{moment.tz(tz.value).format("HH:mm:ss")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <footer style={{ backgroundColor: '#009B77', padding: '10px 0', marginTop: '20px' }}>
        <Typography variant="body2" color="white" align="center">
          © 2024 World Time Clocks. All rights reserved.
        </Typography>
      </footer>
    </Container>
  );
}

export default App;
