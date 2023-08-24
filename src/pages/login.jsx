import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function App() {

    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                
                body: JSON.stringify({
                'email': email,
                'password': password}), // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
              });
              return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
            }
            
        catch (error) {
            console.error(error);
          }
        }   

  return (
    <>
    <h3>Login</h3>



  
    <form onSubmit={handleSubmit}>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

    </form>
    
   
    </>
  )
}


export default App
