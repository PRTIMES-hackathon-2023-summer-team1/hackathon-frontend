import { useState } from "react"


function App() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                
                body: JSON.stringify({
                'name': name,
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
    <form onSubmit={handleSubmit}>
        <label>名前<input name="name" value={name} onChange={(e) => setName(e.target.value)}/ ></label>
        <label>E-mail<input name="email" value={email} onChange={(e) => setEmail(e.target.value)}/ ></label>
        <label>パスワード<input name="password" value={password} onChange={(e) => setPassWord(e.target.value)}/ ></label>
        <button type="submit">サインアップ</button>
    </form>
    
    </>
  )
}


export default App

