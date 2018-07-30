import React from 'react';

const PawRating = (props) => {
  let paws = [];
  let double = Math.round(props.rating * 2);
  
  for (let i = 1; i <= double/2; i++) {
  	paws.push('full');
  };

  if (double%2 !== 0) {
  	paws.push('half');
  };

  while (paws.length < 4) {
  	paws.push('none');
  }

  paws = paws.map((paw,i) => (
    <svg key={i} className={paw}></svg>
  ));

  return (
    <div className="rating row">{paws}</div>
  );

};

export default PawRating;