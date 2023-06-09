import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';

import Room from '../components/Room';
import Equipment from '../components/Equipment';
import History from '../components/History';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import ClientTickets from '../components/ClientTickets';
import TaskServices from '../components/taskManagerdetailsComp/TaskServices';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'} variant={'body2'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



function Settings() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    


    return (
      <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dane" {...a11yProps(0)} />
          <Tab label="Wyposazenie" {...a11yProps(1)} />
          <Tab label="Historia" {...a11yProps(2)} />
          <Tab label="Usługi" {...a11yProps(3)} />
          <Tab label="Prośby klientów" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Room/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Equipment/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <History/>
      </TabPanel>
      <TabPanel value={value} index={3}>
       <TaskServices></TaskServices>
      </TabPanel>
      <TabPanel value={value} index={4}>
       <ClientTickets></ClientTickets>
      </TabPanel>
    </Box>
      </div>
     
      
    );
  }
  
  export default Settings;
  