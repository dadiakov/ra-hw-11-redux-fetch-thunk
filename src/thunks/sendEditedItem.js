import {
    setLoading,
    setError,
    setEditStatus,
    editItem
  } from '../actions/actionCreators';

const sendEditedItem = (item) => async (dispatch, getState) => {
    dispatch(setLoading(true));
      try {
        await fetch('http://localhost:7070/api/services', { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify(item)
        });
        dispatch(setLoading(false));
        dispatch(setEditStatus(false));        
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(true));
        setTimeout(() => {
          dispatch(setError(false));
        }, 700);
        console.log(error)
      } finally {
        dispatch(setError(false));
        dispatch(editItem({...item, name: '', price: '', content: '' }));
        dispatch(setEditStatus(false));
      }
  }

export default sendEditedItem;