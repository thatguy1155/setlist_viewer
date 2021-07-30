import React, { useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { AppContext } from '../../Context/Context';

export default function Graph(props) {
  // TODO: if info is empty push to search page
  const { tally, years } = props;
  const {
    shit,
  } = useContext(AppContext);
  const title = tally.length > 0 && Object.keys(tally[0])[0];
  const labels = years && Object.values(years);
  // const data = tally.length > 0 && Object.values(tally[0][title]);
  const randomColor = () => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgba(${red},${green},${blue},1)`;
  };
  const state = {
    labels,
    datasets: tally.map((song) => {
      const title = Object.keys(song)[0];
      const data = Object.values(song[title]);
      console.log(data);
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
  useEffect(() => {
    // console.log(tally);
  }, [tally]);

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
