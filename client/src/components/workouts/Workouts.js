import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WorkoutItem from './WorkoutItem';
import Spinner from '../layout/Spinner';
import WorkoutContext from '../../context/workout/workoutContext';

const Workouts = () => {
  const workoutContext = useContext(WorkoutContext);

  const { workouts, getWorkouts, loading } = workoutContext;

  useEffect(() => {
    getWorkouts();
    // eslint-disable-next-line
  }, []);

  console.log(workouts);
  if (workouts !== null && workouts.length === 0 && !loading) {
    return <h4>You have no workouts yet..</h4>;
  }

  return (
    <Fragment>
      {workouts !== null && !loading ? (
        <TransitionGroup>
          {workouts.map((workout) => (
            <CSSTransition key={workout._id} timeout={500} classNames="item">
              <WorkoutItem workout={workout} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Workouts;
