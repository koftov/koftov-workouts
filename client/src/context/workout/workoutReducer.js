import {
  GET_WORKOUTS,
  ADD_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  WORKOUT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
        loading: false,
      };
    case ADD_WORKOUT:
      if (state.workouts) {
        return {
          ...state,
          workouts: [action.payload, ...state.workouts],
          loading: false,
        };
      }
    case UPDATE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload._id ? action.payload : workout
        ),
        loading: false,
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
        loading: false,
      };
    case WORKOUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
