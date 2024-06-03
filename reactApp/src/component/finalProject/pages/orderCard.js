import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

function OrderCard({ order }) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {order.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Order Date: {order.orderDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due Date: {order.DueDate}
        </Typography>
        {order.cart.flat().map((item, index) => (
          <Card key={index} sx={{ display: 'flex', marginTop: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={item.p.imgUrl}
              alt={item.p.name}
            />
            <CardContent>
              <Typography component="div" variant="h6">
                {item.p.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.p.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.q}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {item.p.price} ₪
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Company: {item.p.company}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

export default OrderCard;
