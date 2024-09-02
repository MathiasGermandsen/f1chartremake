import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [races, setRaces] = useState([]);
  const cacheKey = 'f1-race-schedules';

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setRaces(JSON.parse(cachedData));
    } else {
      const fetchRaces = async () => {
        try {
          const response = await axios.get('http://ergast.com/api/f1/2024.json');
          const raceData = response.data.MRData.RaceTable.Races;
          setRaces(raceData);
          localStorage.setItem(cacheKey, JSON.stringify(raceData));
        } catch (error) {
          console.error('Error fetching the races', error);
        }
      };

      fetchRaces();
    }
  }, []);

  const getUpcomingRaceIndex = () => {
    const today = new Date();
    return races.findIndex(race => new Date(race.date) > today);
  };

  const upcomingRaceIndex = getUpcomingRaceIndex();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Formula 1 Races 2024</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {races.map((race, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${index === upcomingRaceIndex
              ? 'bg-red-500 text-black'  // Highlight the upcoming race with a red background
              : 'bg-gray-800 dark:bg-gray-900 text-white dark:text-black'
              }`}
          >
            <h2 className="text-xl font-semibold text-white dark:text-white">{race.raceName}</h2>
            <p className="text-white dark:text-white">Date: {race.date}</p>
            <p className="text-white dark:text-white">Location: {race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
            <a href={race.url} className="text-blue-500 dark:text-blue-300 hover:underline">More Info</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
