import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, Button } from '@mui/material';
import dayjs from 'dayjs';
import Loading from '../components/loading';

import ja from "dayjs/locale/ja";
dayjs.locale(ja);

export default function Bookings() {

  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(true)
  const [bookingList, setBookingList] = useState([])

  const getBookingList = async () => {
    try {
      const response = await axios.get(`/bookings`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        setBookingList(response.data)
        setIsLoading(false)
      } else {
        console.error(response.error)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      navigate('/')
    }
  }

  useEffect(() => {
    getBookingList()
  }, [])

  if (isLoading) return <Loading />

  if (bookingList.length === 0) return (
    <Box p={4}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>予約一覧</h1>
      <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#666' }}>予約が見つかりませんでした</h3>
      <Button
        variant='contained'
        onClick={() => { navigate('/') }}
        sx={{ fontSize: '1rem', backgroundColor: '#68c3d4', color: '#fff' }}
      >
        トップページに戻る
      </Button>
    </Box>
  )

  return (
    <Box p={4}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>予約一覧</h1>
      {bookingList.map((bookData) => (
        <Box sx={{ m: 1 }} key={bookData.tour_id}>
          <Card
            onClick={() => { navigate(`/tours/${bookData.tour_id}`) }}
            sx={{
              p: 3,
              borderRadius: 16,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: '#333' }}>{bookData.name}</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#444' }}>
              {dayjs(bookData.first_day).format("YYYY/MM/DD hh:mm")} ~ {dayjs(bookData.first_day).format("YYYY/MM/DD hh:mm")}
            </p>
            <p style={{ fontSize: '1.2rem', color: '#F00' }}>{bookData.participants}名 {bookData.price * bookData.participants}円</p>
          </Card>
        </Box>
      ))}
    </Box>
  )

}
