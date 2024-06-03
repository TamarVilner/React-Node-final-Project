import * as React from 'react';
import { fetchOrder } from '../store/slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import OrderCard from './orderCard'

export default function Orders() {
  const allOrders = useSelector(state => state.order.allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={2}>
        {allOrders.map(order => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
