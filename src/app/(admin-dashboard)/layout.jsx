'use client'
import React, { useEffect, useState } from 'react';
import Login from 'app/(adminauth)/adminlogin/page'; // Adjust import path as needed
import VendorDashboardLayout from 'components/layouts/vendor-dashboard';
import Loading from './loading'; // Import the Loading component
import { useSelector } from 'react-redux';
 
const Layout = ({ children }) => {
  const isAdminAuthenticated = useSelector((state) => state.admin.AdminAuth);
  const [isLoggedIn, setLoggedIn] = useState(null); // null represents loading state
 
  useEffect(() => {
    if (isAdminAuthenticated === null) {
      // If we don't have the authentication status yet, we're in a loading state
      setLoggedIn(null);
    } else {
      // Update local loggedIn state when isAdminAuthenticated changes
      setLoggedIn(isAdminAuthenticated);
    }
  }, [isAdminAuthenticated]);
 
  if (isLoggedIn === null) {
    return <Loading />; // Show loading spinner while status is being determined
  }
 
  if (!isLoggedIn) {
    return <Login />;
  }
 
  return <VendorDashboardLayout>{children}</VendorDashboardLayout>;
};
 
export default Layout;
 
 