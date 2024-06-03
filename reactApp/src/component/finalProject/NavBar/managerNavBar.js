import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Face3Icon from '@mui/icons-material/Face3'; export default function ManagerNavBar() {

    const userInfo = useSelector((state) => state.user.userInfo);

    return (
        <AppBar position="fixed" sx={{ bgcolor: '#00FF66' }}>
            <Toolbar>
                <Button type='text'><Face3Icon /> welcome to  {userInfo.name}</Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sport Shop
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/SignIn">Log Out</Button>
                    <Button color="inherit" component={Link} to="/Products">List of Products</Button>
                    <Button color="inherit" component={Link} to="/Orders">Orders</Button>
                    <Button color="inherit" component={Link} to="/AddProduct">add product</Button>
                    <Button color="inherit" component={Link} to="/Users">Users</Button>
                    <Button color="inherit" component={Link} to="/ShoppingCart">Shopping Cart</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
