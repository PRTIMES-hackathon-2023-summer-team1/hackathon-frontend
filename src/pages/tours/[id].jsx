import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Box, Divider } from '@mui/material'
import markdownit from 'markdown-it'
import Loading from "../../components/loading";


export default function ViewOneTour() {

  const tourId = useParams().id
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [tourData, setTourData] = useState({})

  // ツアー情報を取得
  const getTourData = async () => {
    try {
      const response = await axios.get(`/tours/${tourId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DummyToken`,
        },
      })
      if (response.status === 200) {
        setTourData(response.data)
        setIsLoading(false)
      } else {
        console.error(error)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      navigate('/')
    }
  }

  useEffect(() => {
    getTourData()
  }, [])

  const handleChange = (event) => {
    setPeople(event.target.value);
  };  

  return (
    <div className="detail">
      {isLoading ? <Loading /> : (
        <>
          <div className="Info">
            <h2>{tourData.name}</h2>
            <p>{tourData.price}円/人</p>
            <p>{tourData.description}</p>
          </div>

          <Box sx={{ m: '1ch' }}>
            <Divider variant="inset" />
            <div style={{ textAlign: 'left' }}>
              <div
                dangerouslySetInnerHTML={{ __html: markdownit().render(String(tourData.body)) }}
              />
            </div>
          </Box>
        </>
      )}
    </div>
  )
}
