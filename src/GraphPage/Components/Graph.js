import React, { useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
  // TODO: if info is empty push to search page
  const { songs, years } = props;
  // const data = tally.length > 0 && Object.values(tally[0][title]);
  const randomColor = () => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red},${green},${blue},1)`;
  };
  const state = {
    labels: years,
    datasets: songs.map((song) => {
      const title = song && song.name;
      const data = song && Object.values(song.byYear);
      return {
        label: title,
        fill: false,
        lineTension: 0.5,
        backgroundColor: randomColor(),
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
