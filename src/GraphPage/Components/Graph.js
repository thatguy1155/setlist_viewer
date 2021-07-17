import React, { useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
  // TODO: if info is empty push to search page
  const { tally } = props;
  console.log(tally);
  const title = tally.length > 0 && Object.keys(tally[0])[0];
  const labels = tally.length > 0 && Object.keys(tally[0][title]);
  const data = tally.length > 0 && Object.values(tally[0][title]);
  const state = {
    labels,
    datasets: [
      {
        label: title,
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data,
      },
    ],
  };
  useEffect(() => {
    console.log(tally);
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
