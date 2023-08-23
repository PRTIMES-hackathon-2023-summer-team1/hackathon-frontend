import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, FormControl, TextField, InputAdornment } from '@mui/material'
import Loading from '../../components/loading'

export default function NewTour() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [price, setPrice] = useState(0)
  const [firstDay, setFirstDay] = useState('')
  const [lastDay, setLastDay] = useState('')
  const [maxCapacity, setMaxCapacity] = useState(0)

  // ページアクセス時にユーザーが管理者かどうかを確認する
  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        const response = await axios.get('/users/is_admin', {
          headers: {
            Authorization: `DummyToken`,
          },
        })
        if (response.data.is_admin) {
          setIsLoading(false)
        } else {
          navigate('/')
        }
      } catch (e) {
        console.error(e)
        navigate('/')
      }
    }
    checkIsAdmin()
  }, [])

  // 新規ツアー作成
  const handleSubmit = async () => {
    try {
      const api = axios.create({
        headers: {
          Authorization: `DummyToken`,
        },
      })
      const response = await api.post('/tours', {
        name: name,
        description: description,
        body: body,
        price: price,
        dates: {
          first_day: firstDay,
          last_day: lastDay
        },
        capacity: {
          max: maxCapacity,
          current: 0
        }
      })
      if (response.status === 200) {
        navigate(`/tours/${response.data.tour_id}`)
      } else {
        console.error(e)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      console.error(e)
      setErrorMessage(error.response?.data?.message || error.message)
    }
  }

  return (
    <div>
      {isLoading ? <Loading /> : (
        <div>
          <h1>ツアーの作成</h1>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
          >
            <div>
              <FormControl>
                <TextField
                  required
                  id="ツアー名"
                  label="ツアー名"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  id="簡単な説明"
                  label="簡単な説明"
                  size="small"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  required
                  id="本文"
                  label="本文"
                  multiline
                  fullWidth
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <TextField
                  required
                  id="値段"
                  label="値段"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">¥</InputAdornment>,
                  }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  required
                  id="開始日"
                  label="開始日"
                  size="small"
                  fullWidth
                  value={firstDay}
                  onChange={(e) => setFirstDay(e.target.value)}
                />
                <TextField
                  required
                  id="終了日"
                  label="終了日"
                  size="small"
                  fullWidth
                  value={lastDay}
                  onChange={(e) => setLastDay(e.target.value)}
                />
                <TextField
                  required
                  id="定員"
                  label="定員"
                  size="small"
                  fullWidth
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                >
                  新規作成
                </Button>
                {errorMessage}
              </FormControl>
            </div>

          </Box>
        </div>      
      )}
    </div>
  )
}