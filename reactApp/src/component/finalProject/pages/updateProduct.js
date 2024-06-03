import * as React from 'react';
import Box from '@mui/material/Box';
import { upDateProduct } from '../store/slices/productSlice'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DrawIcon from '@mui/icons-material/Draw';;

const defaultTheme = createTheme();

export default function UpdateProduct() {
    const { id } = useParams();
    const allProducts = useSelector((state) => state.product.allProducts);
    let productUp = allProducts.find(p => p.id == id);
    const dis = useDispatch();
    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newProduct = {
            id: productUp.id, // חובה לכלול את ה-ID לעדכון המוצר הנכון
            name: data.get('name'),
            description: data.get('description'),
            imgUrl: data.get('imgUrl'),
            price: data.get('price'),
            company: data.get('company'),
        }

        dis(upDateProduct(newProduct));
        nav('/Products');
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
                        <DrawIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        update product                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                    defaultValue={productUp.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="description"
                                    name="description"
                                    autoComplete="description"
                                    defaultValue={productUp.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    label="price"
                                    name="price"
                                    autoComplete="price"
                                    defaultValue={productUp.price}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="imgUrl"
                                    label="imgUrl"
                                    type="imgUrl"
                                    id="imgUrl"
                                    autoComplete="imgUrl"
                                    defaultValue={productUp.imgUrl}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="company"
                                    label="company"
                                    type="company"
                                    id="company"
                                    autoComplete="company"
                                    defaultValue={productUp.company}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#00FF66' }}
                        >
                            upDate
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}