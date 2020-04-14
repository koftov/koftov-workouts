import React, { useState, useContext, useEffect } from 'react';
import WorkoutContext from '../../context/workout/workoutContext';
import Exercise from './Exercise';
import { Link } from 'react-router-dom';

const Workout = () => {
  const [workout, setWorkout] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExecises] = useState({ title: workout.title });

  const workoutContext = useContext(WorkoutContext);
  const { addWorkout } = workoutContext;

  useEffect(() => {
    fetch('https://api.jsonbin.io/b/5e931912c740b842f2def316')
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setIsLoading(false);
      });
  }, []);

  const addExersice = (exercise, reps) => {
    const newExercises = { ...exercises };
    newExercises[exercise] = reps;
    setExecises(newExercises);
  };

  const saveWorkout = () => {
    addWorkout({ title: workout.title, exercises });
  };

  return (
    <div>
      <h1>{workout.title}</h1>
      <p>{workout.description}</p>
      {isLoading ? (
        <h1>Loding...</h1>
      ) : (
        <div>
          {workout.exercises.map((exercise, i) => (
            <Exercise
              key={i}
              exercise={exercise}
              sets={workout.sets}
              rest={workout.rest}
              writeLog={addExersice}
            />
          ))}
        </div>
      )}
      <Link
        to="/"
        className="btn btn-primary btn-sm rounded"
        style={{ marginTop: 10 }}
        onClick={saveWorkout}
      >
        End & Save
      </Link>
    </div>
  );
};

export default Workout;
