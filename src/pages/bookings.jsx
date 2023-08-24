import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/loading';

export default function Bookings() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [bookingList, setBookingList] = useState([])

  const getBookingList = async () => {
    try {
      const response = await axios.get(`/bookings`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DummyToken`,
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

  return(
    <div>
      {isLoading ? <Loading /> : (
        <div>
          <h1>予約一覧</h1>
          {bookingList.map((booking) => (
            <></>
          ))}
        </div>
      )}
    </div>
  )

}