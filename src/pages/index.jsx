import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Grid } from '@mui/material'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import Loading from "../components/loading";
dayjs.locale(ja);

function App() {

  const [searchKeyword, setSearchKeyword] = useState('')

  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/tours"); 
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isError) {
    return <p>エラー</p>;
  }

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <Box p={4}>

      <Grid container>
        <Grid item xs={11}>
          <TextField
            required
            id="search-keyword"
            label="ここに単語を入れて検索"
            fullWidth
            value={searchKeyword}
            onChange={(e)=>{setSearchKeyword(e.target.value)}}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            sx={{ m: '1ch' }}
            variant="contained"
            fullWidth
            onClick={async () => {
              if (searchKeyword === '') {
                alert('検索ワードを入力してください')
                return
              }
              setIsLoading(true)
              try {
                const response = await axios.get(`/tours/search?keyword=${searchKeyword}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `DummyToken`,
                  },
                })
                if (response.status === 200) {
                  setData(response.data)
                  setIsLoading(false)
                } else {
                  console.error(response.error)
                }
              } catch (error) {
                console.error(error)
              }
            }}
          >
            検索
          </Button>
        </Grid>
      </Grid>

      { data.length === 0 ? <h1>検索結果がありません</h1> :
        <Box mt={3}>
          {data.map((tour) => (
            <a href={`/tours/${tour.tour_id}`} key={tour.tour_id} style={{ textDecoration: 'none' }}>
              <Box
                className="tourInfo"
                p={3}
                mb={3}
                borderRadius={16}
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                transition="box-shadow 0.3s ease"
                _hover={{ boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)' }}
              >
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>{tour.name}</h2>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#F00' }}>{tour.price}円~</h3>
                <p style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#444' }}>{tour.description}</p>
                <h4 style={{ fontSize: '0.9rem', color: '#444' }}>
                  {dayjs(tour.first_day).format("YYYY/MM/DD hh:mm")} -
                  {dayjs(tour.last_day).format("YYYY/MM/DD hh:mm")}
                </h4>
              </Box>
            </a>
          ))}
        </Box>
      }
    </Box>
  );
}

export default App;
