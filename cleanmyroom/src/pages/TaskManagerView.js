import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';
import TaskDetails from "../components/taskManagerdetailsComp/TaskDetails";
// import TaskServices from "../components/taskManagerdetailsComp/TaskServices";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

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

function TaskManagerView() {
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
        <Tab label="Dane podstawowe" {...a11yProps(0)} />
        {/* <Tab label="Usługi" {...a11yProps(1)} /> */}
        
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <TaskDetails/>
    </TabPanel>
    {/* <TabPanel value={value} index={1}>
      <TaskServices/>
    </TabPanel> */}
  </Box>
    </div>
     
      
    );
  }
  
  export default TaskManagerView;
  