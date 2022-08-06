export function formatTemperature(tempUnit: string, temp: number): string {
  const temperature = tempUnit === 'c' ? temp : temp * 1.8 + 32;

  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(Math.round(temperature)) + '\u00B0'
  );
}

// Format the temperate without the unit but with a degree symbol
export function formatTemperatureWithoutUnit(
  tempUnit: string,
  temp: number
): string {
  const temperature = tempUnit === 'c' ? temp : temp * 1.8 + 32;
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
  }).format(Math.round(temperature));
}

export function formatDay(day: number): string {
  const dayOfWeek = new Intl.DateTimeFormat('en-AU', {
    weekday: 'short',
  }).format(day * 1000);

  return dayOfWeek;
}

// Format the date in the format of 'mmm dd'
export function formatDate(date: number): string {
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    day: 'numeric',
  }).format(date * 1000);
}

// Format time, rounding to the nearest hour.
export function formatTimeByHour(time: number): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
  }).format(time * 1000);
}

// Format time with hour and minute.
export function formatTimeWithSuffix(time: number): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(time * 1000);
}

// Format the wind speed from m/s to km/h if metric, otherwise to mph.
export function formatWindSpeed(windSpeed: number, metric: boolean) {
  if (metric) {
    const windSpeedKmph = Math.round(windSpeed * 3.6);
    return `${windSpeedKmph} km/h`;
  }
  const windSpeedMph = Math.round(windSpeed * 2.2369);
  return `${windSpeedMph} mph`;
}

// Format the wind direction in degrees to a compass direction.
export function formatWindDirection(windDirection: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const index = Math.round((windDirection % 360) / 45);
  return directions[index];
}
