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

  const [data, setData] = useState([]); // <-- Generics で受け取った型を data の型とする
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/tours"); // <-- 引数で受け取った url を fetch する
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
    <>

      <Box >
        <Grid container>
          <Grid item xs={11}>
            <TextField
              required
              id="ここに単語を入れて検索"
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
              onClick={async (e)=>{
                if (searchKeyword === '') {
                  alert('検索ワードを入力してください')
                  return
                }
                // 検索して表示するデータを更新する
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
      </Box>

      { data.length === 0 ? <h1>検索結果がありません</h1> :
        <ul className="container">
          {data.map((tour) => (
            <a href={`/tours/${tour.tour_id}`}>
              <li className="tourInfo">
                <h2>{tour.name}</h2>
                <h3>￥{tour.price}</h3>
                <p>{tour.description}</p>
                <h4>
                  {dayjs(tour.first_day).format("YYYY/MM/DD hh:mm")} -
                  {dayjs(tour.last_day).format("YYYY/MM/DD hh:mm")}
                </h4>
              </li>
            </a>
          ))}
        </ul>
      }
    </>
  );
}

export default App;
