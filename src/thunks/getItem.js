import {
    setLoading,
    setError,
  } from '../actions/actionCreators';
import { editItem } from '../actions/actionCreators';

const getItem = (url) => async (dispatch, getState) => {
    dispatch(setLoading(true));
      try {
          const json = await fetch('http://localhost:7070/api' + url);
          const data = await json.json();
          dispatch(editItem(data));          
      } catch (error) {
        dispatch(setError(true));
        console.log(error);
        setTimeout(() => {
          dispatch(setError(false));
          getItem(url)(dispatch, getState);                 
        }, 1000);
      } finally {
        dispatch(setLoading(false));
      }
  }

export default getItem;