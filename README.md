<h1 align="center">
    <img alt="Bolt Weather Banner" title="Bolt Weather" src="docs/header.png" width="900px" />
</h1>

## <img src="docs/arrow.svg" width="20px">&nbsp; About

A react weather app with a clean, minimal and responsive design that focuses on the essentials.


## <img src="docs/arrow.svg" width="20px">&nbsp; Built with

- [TypeScript](https://github.com/microsoft/TypeScript)
- [Next.js](https://github.com/vercel/next.js)
- [Zustand](https://github.com/pmndrs/zustand)
- [SWR](https://github.com/vercel/swr)
- [Base Web UI](https://github.com/uber/baseweb)
- [Styletron](https://github.com/styletron/styletron)
- [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons)
- [Meteocons](https://github.com/basmilius/weather-icons)
- [OpenWeatherMap Weather Data](https://openweathermap.org/api)
- [Google Maps Places & Geocoding](https://developers.google.com/maps/documentation/geocoding)

## <img src="docs/arrow.svg" width="20px">&nbsp; Development
### Run project
Install and run locally
```bash
yarn
yarn start
```

Build for production
```bash
yarn build
```
### Create ENV variables for API keys
Create an `.env` file in the root of the project and add the following lines:
```bash
GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
OPENWEATHERMAP_API_KEY="YOUR_OPENWEATHERMAP_API_KEY"
```

## <img src="docs/arrow.svg" width="20px">&nbsp; API keys
1. Create an [OpenWeatherMap account](https://home.openweathermap.org/users/sign_up) and generate a key
2. Create a Google Maps Project, then [create an API key](https://developers.google.com/maps/documentation/javascript/get-api-key). In the [Credentials](https://console.cloud.google.com/google/maps-apis/credentials) area you can restrict it to:
    - Geocoding API
    - Places API

##
<br />

Designed and built by [Tom Watts](https://bio.link/tomw)
