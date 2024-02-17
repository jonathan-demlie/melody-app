import { combineReducers } from 'redux';
import songsReducer from './songSlice';
import statsticsReducer from './statisticsSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  statistics: statsticsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
