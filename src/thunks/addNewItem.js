import {
    setLoading,
    setError,
  } from '../actions/actionCreators';
import renderAllData from './renderAllData';
import { editItem } from '../actions/actionCreators';

const addNewItem = (item) => async (dispatch, getState) => {
    dispatch(setLoading(true));
      try {
        await fetch('http://localhost:7070/api/services', { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify({...item, id: 0 })
        });       
      } catch (error) {
        dispatch(setError(true));
        console.log(error);
        setTimeout(() => {
          dispatch(setError(false));                
        }, 1000);
      } finally {
        renderAllData()(dispatch, getState); 
        dispatch(editItem({...item, name: '', price: '', content: '' }));
      }
  }

export default addNewItem;