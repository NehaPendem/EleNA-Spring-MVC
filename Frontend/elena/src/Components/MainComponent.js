import React, {useState } from "react";
import {AppBar,Toolbar,
    CssBaseline,
    Typography,
    makeStyles,Paper, Button,Slider,Box} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AutoComplete from "./AutoComplete";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const useStyles = makeStyles((theme) => ({

    appbar:{
        background: '#4D148C',
        color:'#ffffff'
    },
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
        padding: 0
      },
   divStyle :{
        display: 'flex',
        flexDirection: 'row',
      },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
    root:{
        display:'flex'
    },
    form:{
        flexDirection: 'row',
        width:900,
    },
    textFieldSource: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 10,
        marginTop: 50,
        marginBottom: 30
      },
      textFieldDestination: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 10,
        marginTop: 50,
        marginBotom: 30
      },
      map:{
        width:300,
        height:200
      },
      submit:{
        position: 'relative',
        marginTop: 100,
      }
  }));

const MainComponent =()=>{
    const classes = useStyles();
    const center = {
        lat:42.38027778,
        lng:-72.51972222
      };
      const [directions, setDirections] = useState(null);
      const [map, setMap] = useState(null);
      const places = [
        {lat: 25.8103146,lng: -80.1751609},
        {lat: 27.9947147,lng: -82.5943645},
        {lat: 28.4813018,lng: -81.4387899}
      ]
      const waypoints = places.map(p =>({
        location: {lat: p.lat, lng:p.lng},
        stopover: true
    }));
    const [alignment, setAlignment] = React.useState('max');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
    
    const handleSubmit=()=>{
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            waypoints: waypoints
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              console.log(result);
              setDirections( result);
              directionsRenderer.setDirections(result);
            }else {
              setDirections(null);
            }
          }
        );
    }


    return(<div><AppBar class={classes.appbar} position="static">
        <CssBaseline />
      <Toolbar>
        <Typography variant="h3" className={classes.logo}>
          Elena
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper class={classes.root}>
        <Paper style={{flexDirection:'column',width:900}}>
    <AutoComplete placeHolder = 'Source' />
    <AutoComplete placeHolder = 'Destination'/>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      className='toggle'
    >
      <ToggleButton value="max">Max elevation</ToggleButton>
      <ToggleButton value="min">Min elevation</ToggleButton>
    </ToggleButtonGroup>
    <Box width={300} className='slider'>
    <Typography id="input-slider" gutterBottom>
        X Percentage
      </Typography>
    <Slider defaultValue={10} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
    <Button style={{background:'#FF6101' , color: '#ffffff', width:200,position: 'relative',float:'left',marginLeft: 170, marginRight: 10, marginTop: 50,marginBotom: 30}} 
      variant="contained" onClick={handleSubmit}>Submit</Button>
    </Paper>
    <div class={classes.map} style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
        center={center}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>

    </div>
    </Paper>
    </div>);
};

export default MainComponent;

