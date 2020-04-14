import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import WorkoutContext from '../../context/workout/workoutContext';

const WorkoutItem = ({ workout }) => {
  const workoutContext = useContext(WorkoutContext);
  const { deleteWorkout } = workoutContext;

  const { _id, date, title } = workout;
  console.log(workout);
  const onDelete = () => {
    deleteWorkout(_id);
  };

  return (
    <div className="card rounded bg-light" style={{ borderRadius: '0.5rem' }}>
      <h3 className="text-primary text-left">{title}</h3>
      {workout.exercises
        ? Object.keys(workout.exercises).map((key) => (
            <ul key={key} className="list">
              {key}:{workout.exercises[key]}
            </ul>
          ))
        : []}
      <ul className="list text-success">{date.slice(0, 10)}</ul>

      <p>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

WorkoutItem.propTypes = {
  workout: PropTypes.object.isRequired,
};

export default WorkoutItem;
