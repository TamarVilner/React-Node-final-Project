import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addOrder } from '../store/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const defaultTheme = createTheme();

export default function CompletionOrder() {
    const location = useLocation();
    const totalAmount = location.state?.totalAmount || 0;
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const FNextWeek = `${nextWeek.getDate()}/${nextWeek.getMonth() + 1}/${nextWeek.getFullYear()}`;
    const FToday = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const dis = useDispatch();
    const nav = useNavigate();
    const userInfo = useSelector(u => u.user.userInfo);
    const cartArr = useSelector(u => u.order.cartArr);
    const allUsers = useSelector(u => u.user.allUsers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let i = allUsers.findIndex(u => u.password === userInfo.password && u.name === userInfo.name);
        const newOrder = {
            idUser: allUsers[i].id,
            name: data.get('name'),
            orderDate: data.get('orderDate'),
            DueDate: data.get('DueDate'),
            street: data.get('street'),
            HouseNumber: data.get('House number'),
            floor: data.get('floor'),
            totalAmount: totalAmount,
            cart: cartArr
        }
        dis(addOrder(newOrder));

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your order has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        nav('/ViewOrderDetails')
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#00FF66' }}>
                        <CheckIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Order Confirmation                    </Typography>
                    <Typography component="h2" variant="h6">
                        totalAmount: ₪{totalAmount}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                    value={userInfo.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="telephone"
                                    label="telephone"
                                    name="telephone"
                                    autoComplete="telephone"
                                    value={userInfo.telephone}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="street"
                                    name="street"
                                    required
                                    fullWidth
                                    id="street"
                                    label="street"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="House number"
                                    label="House number"
                                    name="House number"
                                    autoComplete="House number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="floor"
                                    label="floor"
                                    name="floor"
                                    autoComplete="floor"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="orderDate"
                                    label="orderDate"
                                    type="orderDate"
                                    id="orderDate"
                                    autoComplete="orderDate"
                                    value={FToday}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="DueDate"
                                    label="DueDate"
                                    type="DueDate"
                                    id="DueDate"
                                    autoComplete="DueDate"
                                    value={FNextWeek}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#00FF66' }}
                        >
                            confirm order
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
