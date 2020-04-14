import React, { useReducer } from 'react';
import axios from 'axios';
import WorkoutContext from './workoutContext';
import workoutReducer from './workoutReducer';
import {
  GET_WORKOUTS,
  ADD_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  WORKOUT_ERROR,
} from '../types';
import { Redirect } from 'react-router-dom';

const WorkoutState = (props) => {
  const initialState = {
    workouts: null,
    error: null,
  };

  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Get Workouts
  const getWorkouts = async () => {
    try {
      const res = await axios.get('/api/workouts');

      dispatch({
        type: GET_WORKOUTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WORKOUT_ERROR,
        payload: err.response,
      });
    }
  };

  // Add Workout
  const addWorkout = async (workout) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/workouts', workout, config);

      dispatch({
        type: ADD_WORKOUT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WORKOUT_ERROR,
        payload: err,
      });
    }
  };

  // Delete Workout
  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`/api/workouts/${id}`);

      dispatch({
        type: DELETE_WORKOUT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: WORKOUT_ERROR,
        payload: err.response,
      });
    }
  };

  // Update Workout
  const updateWorkout = async (workout) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/workouts/${workout._id}`,
        workout,
        config
      );

      dispatch({
        type: UPDATE_WORKOUT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: WORKOUT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts: state.workouts,
        error: state.error,
        addWorkout,
        deleteWorkout,
        updateWorkout,
        getWorkouts,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutState;
