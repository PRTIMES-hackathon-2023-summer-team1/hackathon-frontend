import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function App() {

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');

    const navigate = useNavigate()
    const [param] = useSearchParams()

    // ログイン処理
    const handleSubmit = async () => {
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
          const redirectPath = param.get('redirect')
          if (redirectPath) {
            navigate(redirectPath)
          } else {
            navigate('/')
          }
        } else {
          console.error(response.error)
        }

      } catch (error) {
        console.error(error)
      }
    }


  return (
    <>
    <h3>Login</h3>



  
    <Box component="form" noValidate sx={{ mt: 1 }}>
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
               </Box>
        {/* <label>E-mail<input name="email" value={email} onChange={(e) => setEmail(e.target.value)}/ ></label> */}
        {/* <label>パスワード<input name="password" value={password} onChange={(e) => setPassWord(e.target.value)}/ ></label> */}
        <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>    
   
    </>
  )
}


export default App
