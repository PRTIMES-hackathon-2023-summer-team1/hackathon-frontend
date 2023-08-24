import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function App() {

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    // ログイン処理
    const loginAndSaveToken = async () => {
      try {
        const response = await axios.post('/users/login', {
          email: email,
          password: password,
        })

        if (response.status === 200) {
          // tokenをsessionstorageに保存
          const {token} = response.data
          sessionStorage.setItem('token', token)

          // ログインに成功したときのリダイレクト処理
          navigate('/')
        } else {
          console.error(response.error)
        }

      } catch (error) {
        console.error(error)
      }
    }

    // ユーザー登録処理
    const handleSubmit = async () => {
      try {
        const response = await axios.post('/users/signup', {
          name: name,
          email: email,
          password: password,
        })
        if (response.status === 200) {
          // このままログイン処理を行ってリダイレクト
          loginAndSaveToken()
        } else {
          console.error(response.error)
        }
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <>

    <h3>サインアップ</h3>
    
    <Box component="form" noValidate sx={{ mt: 1 }}>
    <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus/>
            <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus/>
            <TextField
            value={password} 
            onChange={(e) => setPassWord(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"/>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          SignUp
        </Button>
      </Box>

    </>
  )
}


export default App

