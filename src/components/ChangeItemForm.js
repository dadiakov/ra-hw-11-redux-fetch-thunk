import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditStatus, editItem, addItem, setLoading, setError } from '../actions/actionCreators';
import { Redirect } from 'react-router';
import Ring from './Ring';
import Error from './Error';
import getItem from '../thunks/getItem';
import sendEditedItem from '../thunks/sendEditedItem';

export default function ChangeItemForm({ match: { url }}) {
  const item = useSelector((state) => state.createItemFormReducer);
  const loading = useSelector(state => state.statusReducer.loading);
  const error = useSelector(state => state.statusReducer.error)
  const editStatus = useSelector(state => state.statusReducer.editStatus);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem(url));
  },[])


  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  const onSaveClick = () => {
    if (!item.name || !item.price) {
      console.log('Заполните поля имя и стоимость');
      return;
    }
    dispatch(addItem(item));
    dispatch(sendEditedItem(item));
  };

  const onCancelClick = () => {
    dispatch(editItem({...item, name: '', price: '', content: '' }));
    dispatch(setEditStatus(false));
  };

  const onChangeHandler = ({ target : { name, value }}) => {
    if (!editStatus) { 
      dispatch(setEditStatus(true)); 
      return;
    };
    dispatch(editItem({...item, [name]: value }));
  };

  if(loading) return <Ring />
  if(error) return <Error />

  return ( !editStatus ? <Redirect to={'/services'} /> :
    <form onSubmit={onFormSubmit} action="">
      <input
        name="name"
        value={item.name}
        onChange={onChangeHandler}
        type="text"
        placeholder="name"
      />
      <input
        name="price"
        value={item.price}
        onChange={onChangeHandler}
        type="number"
        placeholder="price"
      />
      <input
        name="content"
        value={item.content}
        onChange={onChangeHandler}
        type="text"
        placeholder="content"
      />
      <button onClick={onSaveClick} className="btn save-button">
        Save
      </button>
      {editStatus ? (
        <button onClick={onCancelClick} className="btn cancel-button">
          Cancel
        </button>
      ) : null}
    </form>
  );
}
