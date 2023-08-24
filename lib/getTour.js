export async function getTour(tourId) {
  return {
    tour_id: 0,
    user_id: 0,
    name: "DisneyLandTour",
    description:
      "Tokyo Disneyland, the Kingdom of Dreams and Magic, consists of seven themed lands, each offering fun attractions in line with its theme, as well as a variety of unique shops and restaurants.Have a magical day at Tokyo Disneyland with your Disney friends!",
    body: "string",
    price: 20000,
    dates: {
      first_day: "2023.08.23",
      last_day: "2023.08.25",
    },
    capacity_people: {
      max: 0,
      current: 0,
    },
  };
}
