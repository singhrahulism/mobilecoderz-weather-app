const API_KEY='9ae2447983447457a57564703f4382ac'
export const WEATHER_BASE_URL=`https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
export const CITY_LIST_BASE_URL='http://52.73.146.184:3000/api/app/user/get-city-list?page=1&search='