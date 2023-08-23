import {useState} from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'

function App() {

  const [image, setImage] = useState(null)

  const handleImageUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!')
      })
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  
  return (
    <div>
      <h1>画像アップロード</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>アップロード</button>
    </div>
  )
}

export default App;