import React, { useState,useEffect } from 'react';
import WorkerAppTopBar from '../components/workerComponents/WorkerAppTopBar';
import UserProfile from '../components/UserProfile';

function WorkerUserProfile() {


  return (
    <div>
        <WorkerAppTopBar></WorkerAppTopBar>
   
    <div >
        <UserProfile></UserProfile>
    </div>
    </div>
  );
}

export default WorkerUserProfile;
