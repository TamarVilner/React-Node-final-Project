import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchProduct, deleteOneProduct } from '../store/slices/productSlice';
import { addProductToCart } from '../store/slices/orderSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const confirmDelete = () => {
    return new Promise((resolve) => {
        const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה לצמיתות?");
        resolve(confirmed);
    });
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#00FF66',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        '& fieldset': {
                            borderColor: '#00FF66',
                        },
                        '&:hover fieldset': {
                            borderColor: '#00FF66',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#00FF66',
                        },
                    },
                },
            },
        },
    },
});

export default function Products() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState('');
    const [quantities, setQuantities] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc'); // מצב לסינון המוצרים

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const userInfo = useSelector(u => u.user.userInfo);
    const arrProduct = useSelector(u => u.product.allProducts);

    const handleDelete = async (id) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            dispatch(deleteOneProduct(id));
            setAlertMessage('המוצר נמחק בהצלחה!');
            setTimeout(() => setAlertMessage(''), 3000);
        }
    };

    const handleQuantityChange = (value) => {
        setQuantities(value);
    };

    const handleSortOrderChange = (event, newOrder) => {
        setSortOrder(newOrder);
    };

    const sortedProducts = [...arrProduct].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <>
            {alertMessage && (
                <Alert severity="success" sx={{ position: 'fixed', top: 90, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                    {alertMessage}
                </Alert>
            )}
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{ mb: 3 }}>
                    <ToggleButtonGroup
                        value={sortOrder}
                        exclusive
                        onChange={handleSortOrderChange}
                        aria-label="Sort order"
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ToggleButton value="asc" aria-label="Sort by price ascending">
                            מהזול ליקר
                        </ToggleButton>
                        <ToggleButton value="desc" aria-label="Sort by price descending">
                            מהיקר לזול
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {sortedProducts && sortedProducts.length > 0 ? (
                    sortedProducts.map((p, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 280 }}
                                    image={p.imgUrl}
                                    title={p.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        ₪ {p.name} {p.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {p.company} {p.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { dispatch(addProductToCart({ p, quantities })) }} size="small" sx={{ color: "#00FF66" }} >
                                        Add to cart
                                    </Button>
                                    {userInfo.name === 'תמר' && userInfo.password === '1234' && (
                                        <>
                                            <Button onClick={() => { handleDelete(p.id) }}>
                                                <DeleteForeverIcon size="big" sx={{ color: "#00FF66" }} />
                                            </Button>
                                            <Button onClick={() => { navigator(`/UpdateProduct/${p.id}`) }}>
                                                <CreateIcon size="big" sx={{ color: "#00FF66" }} />
                                            </Button>
                                        </>
                                    )}
                                    <ThemeProvider theme={theme}>
                                        <TextField
                                            onChange={(e) => handleQuantityChange(e.target.value)}
                                            type="number"
                                            variant="outlined"
                                            label="qty"
                                            fullWidth
                                        />
                                    </ThemeProvider>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" component="div">
                        No products available.
                    </Typography>
                )}
            </Grid>
        </>
    );
}
