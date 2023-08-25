import React from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';

const HeaderContainer = styled.div`
  background: linear-gradient(135deg, #68c3d4, #2980b9);
  padding: 10px 0;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const HeaderItem = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  color: #fff;
  font-weight: bold;
  border-radius: 16px;
  
  &:hover {
    background-color: #1e5f74;
  }
`;

const redirectToBooking = () => {
  if (sessionStorage.getItem('token') !== null) {
    location.href = '/bookings';
  } else {
    location.href = '/login?redirect=/bookings';
  }
};

export default function Header() {
  return (
    <HeaderContainer>
      <Grid container>
        <Grid item xs={2}>
          <HeaderItem onClick={() => { location.href = '/' }}>トップページ</HeaderItem>
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={1}>
          <HeaderItem onClick={redirectToBooking}>予約確認</HeaderItem>
        </Grid>
        <Grid item xs={1}>
          <HeaderItem onClick={() => { location.href = '/signup' }}>新規登録</HeaderItem>
        </Grid>
        <Grid item xs={1}>
          <HeaderItem onClick={() => { location.href = '/login' }}>ログイン</HeaderItem>
        </Grid>
      </Grid>
    </HeaderContainer>
  );
}
