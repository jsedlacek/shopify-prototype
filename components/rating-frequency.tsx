import React from 'react';
import BarChart from '../charts/bar-chart';

interface Size {
  width: number;
  height: number;
}

function group(rating: number) {
  if (rating <= 6) {
    return 'detractor';
  } else if (rating <= 8) {
    return 'passive';
  } else {
    return 'promoter';
  }
}

const colors = {
  promoter: '#7bc657',
  passive: '#fbb56d',
  detractor: '#f76b57'
};

export default function RatingFrequency({
  size,
  ratingCounts
}: {
  size: Size;
  ratingCounts: number[];
}) {
  const model = ratingCounts.map((count, rating) => ({
    key: `${rating}`,
    value: count,
    label: `${rating}`,
    color: colors[group(rating)]
  }));

  return (
    <BarChart
      size={size}
      items={model}
      renderValue={value => (
        <>
          <b>{value}</b> response(s)
        </>
      )}
      renderLabel={label => `Rating ${label}`}
    />
  );
}
