import * as React from 'react';
import Box from '@mui/material/Box';
import { addOneProduct } from '../store/slices/productSlice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from 'react-hook-form';

const defaultTheme = createTheme();

export default function AddProduct() {
    const dis = useDispatch();
    const nav = useNavigate();
    
    const { register, handleSubmit, formState: { errors, dirtyFields, isValid }, getValues } = useForm({
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        const newProduct = {
            name: data.name,
            description: data.description,
            imgUrl: data.imgUrl,
            price: data.price,
            company: data.company,
        };
        dis(addOneProduct(newProduct)).unwrap().then(() => {
            nav('/Products');
        }).catch((error) => {
            console.error('Failed to add product:', error);
        });
    };

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
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Product
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    {...register("name", { required: "זהו שדה חובה" })}
                                />
                                {errors.name && <p>{errors.name.message}</p>}
                                {dirtyFields.name && <p>השם שונה</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    autoComplete="description"
                                    {...register("description", { required: "זהו שדה חובה" })}
                                />
                                {errors.description && <p>{errors.description.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    autoComplete="price"
                                    {...register("price", { 
                                        required: "זהו שדה חובה",
                                        min: {
                                            value: 1,
                                            message: "המחיר חייב להיות לפחות 1"
                                        }
                                    })}
                                />
                                {errors.price && <p>{errors.price.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="imgUrl"
                                    label="Image URL"
                                    type="url"
                                    id="imgUrl"
                                    autoComplete="imgUrl"
                                    {...register("imgUrl", { 
                                        required: "זהו שדה חובה",
                                        pattern: {
                                            value: /^(ftp|http|https):\/\/[^ "]+$/,
                                            message: "URL לא תקין"
                                        }
                                    })}
                                />
                                {errors.imgUrl && <p>{errors.imgUrl.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="company"
                                    label="Company"
                                    id="company"
                                    autoComplete="company"
                                    {...register("company", { required: "זהו שדה חובה" })}
                                />
                                {errors.company && <p>{errors.company.message}</p>}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#00FF66' }}
                            disabled={!isValid}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
