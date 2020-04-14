import React, { useState, Fragment } from 'react';
import './Exercise.css';

const Exercise = ({ exercise, sets, rest, writeLog }) => {
  const [reps, setReps] = useState(0);

  const onClick = () => {
    setReps(reps + 1);
    if (reps > 11) {
      setReps(0);
    }
    writeLog(exercise.title, reps + 1);
  };

  return (
    <Fragment>
      <div className="exercise">
        <a
          href={`https://www.youtube.com/embed/${exercise.videoId}`}
          target="_blank"
        >
          <img src={`https://img.youtube.com/vi/${exercise.videoId}/0.jpg`} />
          {exercise.title}
          <br />
          {exercise.minReps} - {exercise.maxReps}
        </a>
        <input onClick={onClick} readOnly="readOnly" value={reps} />
      </div>
      <span>
        <i className="bx bx-time"></i>
        {` Rest for ${rest} seconds`}
      </span>
    </Fragment>
  );
};

export default Exercise;
