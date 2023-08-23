import { useState } from "react"




function App() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await api.post('/signup', {
            'name': name,
            'email': email,
            'password': password
          })}catch (error) {
            console.error(e)
            setErrorMessage(error.response?.data?.message || error.message)
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

