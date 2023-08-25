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
      const response = await axios.get(
        `http://localhost:8080/tours/${tourId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `DummyToken`,
          },
        }
      );
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
    if (isLoggedIn) {
      navigate(`https://localhost:8080/tours/booking/${tourId}`);
    } else {
      navigate(
        `https://localhost:8080/login?redirect=/tours/booking/${tourId}`
      );
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
          <div className="tour-details">
            <div className="Info">
              <h2>{tourData.name}</h2>
              <p>{tourData.description}</p>
              <p>
                {dayjs(tourData.first_day).format("YYYY/MM/DD hh:mm")} ~{" "}
                {dayjs(tourData.last_day).format("YYYY/MM/DD hh:mm")}
              </p>
              <p>{tourData.price}円/人</p>
            </div>
          </div>

          <Box sx={{ m: "1ch" }}>
            <Divider variant="inset" />
            <div className="tour-description">
              <div style={{ textAlign: "left" }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdownit().render(String(tourData.body)),
                  }}
                />
              </div>
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
