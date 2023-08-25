import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Divider } from "@mui/material";
import markdownit from "markdown-it";
import dayjs from "dayjs";
import Loading from "../../components/loading";

export default function ViewOneTour() {
  const tourId = useParams().id;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 仮置き，認証ができたらContextに移行
  const [tourData, setTourData] = useState({});

  // ツアー情報を取得
  const getTourData = async () => {
    try {
      const response = await axios.get(`/tours/${tourId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `DummyToken`,
        },
      });
      if (response.status === 200) {
        setTourData(response.data);
        setIsLoading(false);
      } else {
        console.error(error);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  const redirectToBooking = () => {
    if (sessionStorage.getItem("token") !== null /* ログイン判定のAPIが無いのでtokenの有無で代用 */) {
      console.log(sessionStorage.getItem("token"))
      navigate(`/tours/booking/${tourId}`);
    } else {
      navigate(`/login?redirect=/tours/booking/${tourId}`);
    }
  };

  useEffect(() => {
    getTourData();
  }, []);

  return (
    <div className="detail">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="Info">
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>{tourData.name}</h2>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#F00' }}>{tourData.price}円~</h3>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#444' }}>{tourData.description}</p>
          <h4 style={{ fontSize: '0.9rem', color: '#444' }}>
            {dayjs(tourData.first_day).format("YYYY/MM/DD hh:mm")} -
            {dayjs(tourData.last_day).format("YYYY/MM/DD hh:mm")}
          </h4>
          </div>

          <Box sx={{ m: "1ch" }}>
            <Divider variant="inset" />
            <div style={{ textAlign: "left" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownit().render(String(tourData.body)),
                }}
              />
            </div>
          </Box>

          <Button variant="contained" onClick={redirectToBooking}>
            このツアーを予約する
          </Button>
        </>
      )}
    </div>
  );
}
