import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, FormControl, TextField, InputAdornment, Divider } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import markdownit from 'markdown-it'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
import Loading from '../../components/loading'

export default function NewTour() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [image, setImage] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [price, setPrice] = useState(0)
  const [firstDay, setFirstDay] = useState()
  const [lastDay, setLastDay] = useState()
  const [maxCapacity, setMaxCapacity] = useState(0)

  // 管理者かどうかを確認
  const checkIsAdmin = async () => {
    try {
      const response = await axios.get('/users/is_admin', {
        headers: {
          Authorization: `DummyToken`,
        },
      })
      if (response.status === 200 && response.data.is_admin) {
        setIsLoading(false)
      } else {
        navigate('/')
      }
    } catch (e) {
      console.error(e)
      navigate('/')
    }
  }

  // 新規ツアー作成
  const handleSubmit = async () => {
    try {
      const api = axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DummyToken`,
        },
      })
      const response = await api.post('/tours', {
        user_id: '1', // temporary user_id
        name: name,
        description: description,
        body: body,
        price: Number(price),
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
        console.error(error)
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.response?.data?.message || error.message)
    }
  }

  // 画像アップロード
  const handleImageUpload = () => {
    if (image) {
      const uuid = crypto.randomUUID()
      const storageRef = ref(storage, `images/${uuid}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        setBody(body + `![](https://firebasestorage.googleapis.com/v0/b/prtimes-hackathon.appspot.com/o/images%2F${uuid}?alt=media)`)
      })
    }
  }
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  // ページアクセス時
  useEffect(() => {
    //checkIsAdmin()
  }, [])

  return (
    <div>
      {isLoading ? <Loading /> : (
        <div>
          <h1>ツアーの作成</h1>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '75ch' },
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateFormats={{ monthAndYear: 'YYYY年 MM月' }}
                  localeText={{
                    previousMonth: '前月',
                    nextMonth: '次月',
                  }}
                >
                  <DateTimePicker
                    id="開始日"
                    label="開始日"
                    inputFormat="YYYY/MM/DD HH:mm"
                    renderInput={(props) => <StyledTextField InputLabelProps={{ shrink: true }} {...props} />}
                    ampm={false}
                    ampmInClock={false}
                    value={firstDay}
                    onChange={(newValue) => {
                      newValue !== null && setFirstDay(newValue?.format('YYYY-MM-DDTHH:mm:ss+09:00'))
                    }}
                  />
                  <DateTimePicker
                    id="終了日"
                    label="終了日"
                    inputFormat="YYYY/MM/DD HH:mm"
                    renderInput={(props) => <StyledTextField InputLabelProps={{ shrink: true }} {...props} />}
                    ampm={false}
                    ampmInClock={false}
                    value={lastDay}
                    onChange={(newValue) => {
                      newValue !== null && setLastDay(newValue?.format('YYYY-MM-DDTHH:mm:ss+09:00'))
                    }}
                  />
                </LocalizationProvider>
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
                  onClick={handleSubmit}
                >
                  新規作成
                </Button>
                {errorMessage}
              </FormControl>
            </div>
          </Box>
          <Box sx={{ m: '1ch' }}>
            <div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button onClick={handleImageUpload}>アップロード</button>
            </div>
          </Box>
          <Divider variant="inset" sx={{ m: '1ch' }} />
          <Box sx={{ m: '1ch' }}>
            <h2>プレビュー</h2>
            <Divider variant="inset" sx={{ m: '1ch' }} />
            <div style={{ textAlign: 'left' }}>
              <div
                dangerouslySetInnerHTML={{ __html: markdownit().render(body) }}
              />
            </div>
          </Box>
        </div>
      )}
    </div>
  )
}