import "./index.css";
import { useEffect, useState } from "react";
import { Box, TextField, Button, Grid } from '@mui/material'
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

function App() {
  const [data, setData] = useState([]); // <-- Generics で受け取った型を data の型とする
  const [isLoading, setLoading] = useState(true);
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
        setLoading(false);
      }
    })();
  }, []);

  if (isError) {
    return <p>エラー</p>;
  }

  if (isLoading) {
    return <p>読み込み中</p>;
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
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              sx={{ m: '1ch' }}
              variant="contained"
              fullWidth
              onClick={(e)=>{}}
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </Box>

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
    </>
  );
}

export default App;
