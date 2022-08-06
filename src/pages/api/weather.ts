import type { NextApiRequest, NextApiResponse } from 'next';
import { mockWeatherResponse } from '../../utils/mockData';

export default async function weather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let lat = mockWeatherResponse.lat;
  let lon = mockWeatherResponse.lon;

  if (!req.query.location) {
    return res.status(400).json({
      message: 'Cannot fetch weather data, no location was found.',
    });
  }

  try {
    const geocode = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${req?.query?.location}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const coordinates = await geocode.json();

    if (coordinates.status === 'OK') {
      lat = coordinates?.results[0]?.geometry?.location?.lat;
      lon = coordinates?.results[0]?.geometry?.location?.lng;
    } else {
      return res.status(500).json({ message: coordinates?.status });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    const forecast = await weather.json();

    if (Object.keys(forecast).length) {
      return res.status(200).json(forecast);
    } else {
      return res.status(500).json({ message: 'No weather data found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
