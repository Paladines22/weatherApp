import React, { useState } from 'react';
import WeatherInfoCard from './components/WeatherInfoCard';

const App = () => {
  const [conditionWeather, setConditionWeather] = useState('default');

  return (
    <div
      className={`h-full flex flex-col justify-center items-center p-10 bg-cover bg-center ${conditionWeather}`}
    >
      <WeatherInfoCard setConditionWeather={setConditionWeather} />
    </div>
  );
};

export default App;
