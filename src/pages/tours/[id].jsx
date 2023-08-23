import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getTour } from "../../../lib/getTour";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';



function App() {
  const {id} = useParams()
  const [data, setData] = useState()
  const [people, setPeople] = useState('');
  const handleChange = (event) => {
    setPeople(event.target.value);
  };





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
      <p>{data.price}円</p>
      <p>{data.description}</p>


            

    <Paper elevation={3} sx={{width: 500}}>
      <p>Tour:{data.name}</p>
          {/* <p>your name: {}</p> */}
          <p>user_id:{data.user_id}</p>
          <p>price: {data.price + "円"}</p>
          <p>date: {data.dates.first_day} - {data.dates.last_day}</p>

          <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">People</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={people}
            label="People"
            onChange={handleChange}
            sx={{width: 200}}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
        
      </Box>
    </Paper>


  
    </>
  )
}

export default App