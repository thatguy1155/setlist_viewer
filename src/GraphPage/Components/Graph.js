import React, { useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { randomColor } from '../../Context/auxFunctions';

export default function Graph(props) {
  // TODO: if info is empty push to search page
  const { songs, years, randomColor } = props;
  // const data = tally.length > 0 && Object.values(tally[0][title]);
  const state = {
    labels: years,
    datasets: songs.map((song) => {
      const title = song && song.name;
      const data = song && Object.values(song.byYear);
      return {
        label: title,
        fill: false,
        lineTension: 0.5,
        backgroundColor: song.color,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data,
      };
    }),
  };

  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>

  );
}
