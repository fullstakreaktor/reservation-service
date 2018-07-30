import React from 'react';

const PawRating = (props) => {
  let paws = [];
  const double = Math.round(props.rating * 2);

  for (let i = 1; i <= double / 2; i += 1) {
    paws.push('full');
  }

  if (double % 2 !== 0) {
    paws.push('half');
  }

  while (paws.length < 4) {
    paws.push('none');
  }

  paws = paws.map((paw, i) => (
    <svg key={i + paw} className={paw} />
  ));

  return (
    <div className="rating row">
      {paws}
    </div>
  );
};

export default PawRating;
