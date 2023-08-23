import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getTour } from "../../../lib/getTour";

function App() {
  const {id} = useParams()
  const [data, setData] = useState()

  useEffect(() => {
    // 即時関数
    (async() => {
      try {
        const data = await getTour(id);
        setData(data);
      } catch(err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })()
  }, []);

  if (!data) return <></>


  return (
    <>
      <p>tour id: {id}</p>
      <h2>{data.name}</h2>
      <p>{data.price}</p>
      <p>{data.description}</p>
    </>
  )
}

export default App