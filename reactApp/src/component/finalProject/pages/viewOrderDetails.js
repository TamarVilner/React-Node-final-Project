import * as React from 'react';
import { getByUserId } from '../store/slices/orderSlice';
import { fetchUser } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import OrderCard from './orderCard'

export default function ViewOrderDetails() {
  const dispatch = useDispatch();
  const allOrders = useSelector(state => state.order.allOrders);
  const allUsers = useSelector(u => u.user.allUsers);
  const userInfo = useSelector(u => u.user.userInfo);
  let i = allUsers.findIndex(u => u.password === userInfo.password && u.name === userInfo.name);
  let id = allUsers[i].id;

  useEffect(() => {
    dispatch(getByUserId(id));
    dispatch(fetchUser());
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
