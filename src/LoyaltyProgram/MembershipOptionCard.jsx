// MembershipOptionCard.js

import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const MembershipOptionCard = ({ title, benefits, price, onJoin }) => {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ overflow: 'auto' }}>
          <Typography variant="h5"  sx={{ textAlign: "center", mb:'10px' }}>{title} Plan</Typography>
          <ul>
            {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
          </ul>
          <Typography variant="h6"  sx={{ textAlign: "center" }}>{price}</Typography>
        </CardContent>
        <CardActions sx={{ marginTop: 'auto', justifyContent: 'center' }}>
        <Button variant="contained" onClick={onJoin}>Become a Member</Button>
      </CardActions>
      </Card>
    );
  };
  
  export default MembershipOptionCard;
  
