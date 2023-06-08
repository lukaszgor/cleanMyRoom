import React, { useState,useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

function AdminUserProfile() {


  return (
    <div>
        <ResponsiveAppBar></ResponsiveAppBar>
   
    <div >
        <UserProfile></UserProfile>
    </div>
    </div>
  );
}

export default AdminUserProfile;
