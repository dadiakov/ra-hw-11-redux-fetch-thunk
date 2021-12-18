import {
    setLoading,
    setError,
    allItems,
  } from '../actions/actionCreators';

const renderAllData = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const json = await fetch('http://localhost:7070/api/services');
      const data = await json.json();
      dispatch(allItems(data))
    } catch (error) {
      dispatch(setError(true));
      setTimeout(() => {
        dispatch(setError(false));
        renderAllData()(dispatch, getState);                    
      }, 1000);
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
}

export default renderAllData;