import { useState } from "react"


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
        <label>E-mail<input name="email" value={email} onChange={(e) => setEmail(e.target.value)}/ ></label>
        <label>パスワード<input name="password" value={password} onChange={(e) => setPassWord(e.target.value)}/ ></label>
        <button type="submit">ログイン</button>
    </form>
    
    </>
  )
}


export default App
