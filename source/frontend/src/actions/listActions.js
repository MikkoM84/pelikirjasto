import {fetchLoading,loadingDone} from './loginActions';

//LIST ACTIONS
export const GET_GAMELIST_SUCCESS = "GET_GAMELIST_SUCCESS"
export const GET_GAMELIST_FAILED = "GET_GAMELIST_FAILED"
export const ADD_TO_GAMELIST_SUCCESS = "ADD_TO_GAMELIST_SUCCESS"
export const ADD_TO_GAMELIST_FAILED = "ADD_TO_GAMELIST_FAILED"
export const REMOVE_FROM_GAMELIST_SUCCESS = "REMOVE_FROM_GAMELIST_SUCCESS"
export const REMOVE_FROM_GAMELIST_FAILED = "REMOVE_FROM_GAMELIST_FAILED"
export const EDIT_GAMELISTITEM_SUCCESS = "EDIT_GAMELISTITEM_SUCCESS"
export const EDIT_GAMELISTITEM_FAILED = "EDIT_GAMELISTITEM_FAILED"
export const GET_COLLECTIONLIST_SUCCESS = "GET_COLLECTIONLIST_SUCCESS"
export const GET_COLLECTIONLIST_FAILED = "GET_COLLECTIONLIST_FAILED"
export const ADD_TO_COLLECTIONLIST_SUCCESS = "ADD_TO_COLLECTIONLIST_SUCCESS"
export const ADD_TO_COLLECTIONLIST_FAILED = "ADD_TO_COLLECTIONLIST_FAILED"
export const REMOVE_FROM_COLLECTIONLIST_SUCCESS = "REMOVE_FROM_COLLECTIONLIST_SUCCESS"
export const REMOVE_FROM_COLLECTIONLIST_FAILED = "REMOVE_FROM_COLLECTIONLIST_FAILED"
export const EDIT_COLLECTIONLISTITEM_SUCCESS = "EDIT_COLLECTIONLISTITEM_SUCCESS"
export const EDIT_COLLECTIONLISTITEM_FAILED = "EDIT_COLLECTIONLISTITEM_FAILED"
export const GET_CATEGORYLIST_SUCCESS = "GET_CATEGORYLIST_SUCCESS"
export const GET_CATEGORYLIST_FAILED = "GET_CATEGORYLIST_FAILED"
export const ADD_TO_CATEGORYLIST_SUCCESS = "ADD_TO_CATEGORYLIST_SUCCESS"
export const ADD_TO_CATEGORYLIST_FAILED = "ADD_TO_CATEGORYLIST_FAILED"
export const REMOVE_FROM_CATEGORYLIST_SUCCESS = "REMOVE_FROM_CATEGORYLIST_SUCCESS"
export const REMOVE_FROM_CATEGORYLIST_FAILED = "REMOVE_FROM_CATEGORYLIST_FAILED"
export const EDIT_CATEGORYLISTITEM_SUCCESS = "EDIT_CATEGORYLISTITEM_SUCCESS"
export const EDIT_CATEGORYLISTITEM_FAILED = "EDIT_CATEGORYLISTITEM_FAILED"
export const LOGOUT_DONE = "LOGOUT_DONE"

//ACTIONS
export const getShoppingList = (token) => {
	return dispatch => {
		let request = {
			  method:"GET",
			  mode:"cors",
			  credentials:"include",
			  headers:{"Content-Type":"application/json",
						"token":token}
		  }
		dispatch(fetchLoading());
		return fetch("/api/shopping",request).then(response => {
				dispatch(loadingDone());
				if(response.ok) {
					response.json().then(data => {
						dispatch(getShoppingListSuccess(data))
					}).catch(error => {
						dispatch(getShoppingListFailed("Error in parsing response json"));	
					});
				} else {
					dispatch(getShoppingListFailed("Server responded with status:"+response.statusText));

		  }}).catch(error => {
				dispatch(loadingDone());
				dispatch(getShoppingListFailed(error));
			});		
		}
}

export const addToList = (item,token,history) => {
	return dispatch => {
		 let request = {
			  method:"POST",
			  mode:"cors",
			  credentials:"include",
			  headers:{"Content-Type":"application/json",
						"token":token},
			  body:JSON.stringify(item)
		  }
		  dispatch(fetchLoading());
		  return fetch("/api/shopping",request).then(response => {
				if(response.ok) {
					dispatch(addToListSuccess());
					dispatch(getShoppingList(token));
					history.push("/list");
				} else {
					dispatch(addToListFailed("Server responded with status:"
					+response.statusText));
					dispatch(loadingDone());

				}
		  }).catch(error => {
				dispatch(addToListFailed(error));
				dispatch(loadingDone());
		  })
		
		}
}

export const removeFromList = (id,token) => {
	return dispatch => {
	  let request = {
		  method:"DELETE",
		  mode:"cors",
		  credentials:"include",
		  headers:{"Content-Type":"application/json",
					"token":token}
	  }
	  dispatch(fetchLoading());
	  return fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				dispatch(removeFromListSuccess());
				dispatch(getShoppingList(token));
			} else {
				dispatch(removeFromListFailed("Server responded with status:"+response.statusText));
				dispatch(loadingDone());

			}
	  }).catch(error => {
			dispatch(removeFromListFailed(error));
			dispatch(loadingDone());
	  })		
	}
}

export const editItem = (item,token) => {
	return dispatch => {
	  let request = {
		  method:"PUT",
		  mode:"cors",
		  credentials:"include",
		  headers:{"Content-Type":"application/json",
					"token":token},
		  body:JSON.stringify(item)
	  }
	  dispatch(fetchLoading());
	  return fetch("/api/shopping/"+item._id,request).then(response => {
			if(response.ok) {
				dispatch(editItemSuccess());
				dispatch(getShoppingList(token));
			} else {
				dispatch(loadingDone());
				dispatch(editItemFailed("Server responded with status:"+response.statusText));

			}
	  }).catch(error => {
			dispatch(loadingDone());
			dispatch(editItemFailed(error));
	  })
		
	}
}

//ACTION CREATORS

const getShoppingListSuccess = (list) => {
	return {
		type:GET_SHOPPINGLIST_SUCCESS,
		list:list
	}
}

const getShoppingListFailed = (error) => {
	return {
		type:GET_SHOPPINGLIST_FAILED,
		error:error
	}
}

const addToListSuccess = () => {
	return {
		type:ADD_TO_LIST_SUCCESS
	}
}

const addToListFailed = (error) => {
	return {
		type:ADD_TO_LIST_FAILED,
		error:error
	}	
}

const removeFromListSuccess = () => {
	return {
		type:REMOVE_FROM_LIST_SUCCESS
	}
}

const removeFromListFailed = (error) => {
	return {
		type:REMOVE_FROM_LIST_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:EDIT_ITEM_FAILED,
		error:error
	}
}

export const logoutDone = () => {
	return {
		type:LOGOUT_DONE
	}
}