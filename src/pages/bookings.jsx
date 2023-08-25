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
        console.log(response.data)
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
    <div>
      <h1>予約一覧</h1>
      <h3>予約が見つかりませんでした</h3>
      <Button
        variant='contained'
        onClick={()=>{navigate('/')}}
      >
        トップページに戻る
      </Button>
    </div>
  )

  return(
    <div>
      <h1>予約一覧</h1>
      {bookingList.map((bookData) => (
        <Box sx={{ m: 1 }} key={bookData}>
          <Card>
            <h3>{bookData.name}</h3>
            <p>{dayjs(bookData.first_day).format("YYYY/MM/DD hh:mm")} ~ {dayjs(bookData.first_day).format("YYYY/MM/DD hh:mm")}</p>
            <p>{bookData.participants}名 {bookData.price*bookData.participants}円</p>
          </Card>
        </Box>
      ))}
    </div>
  )

}