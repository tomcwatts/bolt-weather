import type { NextApiRequest, NextApiResponse } from 'next';

export default async function places(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.location) {
    return res.status(400).json({
      message: 'Cannot fetch weather data, no location was found.',
    });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req?.query?.location}&types=(cities)&language=en&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const locations = data?.predictions?.map(
        (prediction: Record<string, string>) => {
          return prediction?.description;
        }
      );
      return res.status(200).json(locations);
    } else {
      return res.status(500).json({ message: data?.status });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
