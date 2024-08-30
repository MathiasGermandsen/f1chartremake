import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DriverStandings = () => {
  const [standings, setStandings] = useState([]);
  const cacheKey = 'CHNAE_THIS_KEY';

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setStandings(JSON.parse(cachedData));
    } else {
      const fetchStandings = async () => {
        try {
          const response = await axios.get('http://ergast.com/api/f1/current/driverStandings.json');
          setStandings(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
          localStorage.setItem(cacheKey, JSON.stringify(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings));
        } catch (error) {
          console.error('Error fetching driver standings', error);
        }
      };

      fetchStandings();
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Current Driver Standings</h1>
      <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Driver</th>
            <th className="py-2 px-4 border-b">Nationality</th>
            <th className="py-2 px-4 border-b">Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((driver, index) => (
            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4 border-b">{driver.position}</td>
              <td className="py-2 px-4 border-b">
                {driver.Driver.givenName} {driver.Driver.familyName}
              </td>
              <td className="py-2 px-4 border-b">{driver.Driver.nationality}</td>
              <td className="py-2 px-4 border-b">{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverStandings;
