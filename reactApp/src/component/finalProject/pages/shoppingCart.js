import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductFromCart, upDateOrderDetails, amountToPay, qtyOfProduct } from '../store/slices/orderSlice'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const confirmDelete = () => {
    return new Promise((resolve) => {
        const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה לצמיתות?");
        resolve(confirmed);
    });
};

const confirmUp = () => {
    return new Promise((resolve) => {
        const confirmed = window.confirm("האם אתה בטוח שברצונך לעדכן כמות במוצר זה ?");
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

export default function ShoppingCart() {
    const nav = useNavigate();
    const dis = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const cartArr = useSelector((state) => state.order.cartArr);
    const [alertMessage, setAlertMessage] = useState('');
    const [quantities, setQuantities] = useState(1);

    const handleDelete = async (id) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            dis(deleteProductFromCart(id));
            setAlertMessage('המוצר נמחק בהצלחה!');
            setTimeout(() => setAlertMessage(''), 3000);
        }
    };

    const handleUpDate = async (id) => {
        const confirmed = await confirmUp();
        if (confirmed) {
            const q = parseInt(quantities, 10)
            console.log({ id, q }, "{id, q}");
            dis(upDateOrderDetails({ id, q }));
            setAlertMessage('המוצר התעדכן בהצלחה!');
            setTimeout(() => setAlertMessage(''), 3000);
        }
    };

    const handleQuantityChange = (value) => {
        console.log("value", value);
        setQuantities(value);
    };
    console.log(cartArr, "cartArr");

    const amountToPay = () => {
        if (cartArr) {
            return cartArr.reduce((total, item) => {
                return total + parseInt((item[0].q * item[0].p.price), 10);
            }, 0);
        }
    }

    const qtyOfProduct = () => {
        if (cartArr) {
            return cartArr.reduce((total, item) => {
                return total + parseInt(item[0].q, 10);
            }, 0);
        }
    }

    return (
        <>
            <h1>welcome {userInfo !== null && userInfo.name} look your shoppingCart</h1>
            {cartArr && cartArr.length > 0 ? (
                cartArr.map((g, index) => (
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 280 }}
                            image={g[0].p.imgUrl}
                            title={g[0].p.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {g[0].p.name}  {g[0].p.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {g[0].p.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => { handleDelete(g[0].p.id) }}>
                                <DeleteForeverIcon size="big" sx={{ color: "#00FF66" }} />
                            </Button>
                            <Button onClick={() => { handleUpDate(g[0].p.id) }}>
                                <CreateIcon size="big" sx={{ color: "#00FF66" }} />
                            </Button>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    type="number"
                                    variant="outlined"
                                    label="qty"
                                    fullWidth
                                    defaultValue={isNaN(g[0].q) ? '' : g[0].q} // אם g[0].q הוא NaN, הגדר את defaultValue ל-'' (ריק)
                                />
                            </ThemeProvider>
                        </CardActions>
                    </Card>
                ))
            ) : (
                <Typography variant="h6" component="div">
                    No products available.
                </Typography>
            )}

            <h1> Quantity of products in the basket:{qtyOfProduct()}</h1>
            <h1> Total Price: {amountToPay()} ₪</h1>
            <div class="ui buttons">
                <button onClick={() => { nav('/Products') }} class="ui button">Cancel</button>
                <div class="or"></div>
                <button onClick={() => { nav('/CompletionOrder', { state: { totalAmount: amountToPay() } }) }} class="ui positive button">Save</button>
            </div>
        </>
    );
}