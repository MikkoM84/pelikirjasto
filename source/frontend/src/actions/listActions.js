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
export const SET_GAMECOLLECTION_DONE = "SET_GAMECOLLECTION_DONE"
export const SET_GAMES_PER_PAGE = "SET_GAMES_PER_PAGE"


//ACTIONS
export const getList = (token,url) => {
	return dispatch => {
		let request = {
			  method:"GET",
			  mode:"cors",
			  credentials:"include",
			  headers:{"Content-Type":"application/json",
						"token":token}
		  }
		dispatch(fetchLoading());
		return fetch(url,request).then(response => {
				dispatch(loadingDone());
				if(response.ok) {
					response.json().then(data => {
						if(url==="/api/pelit/") {
							dispatch(getGameListSuccess(data))
						} else if(url==="/api/kokoelmat/") {
							dispatch(getCollectionListSuccess(data))
						} else if(url==="/api/kategoriat/") {
							dispatch(getCategoryListSuccess(data))
						} else {
							console.log("fail_getlist_response, should never go here");
						}
					}).catch(error => {
						if(url==="/api/pelit/") {
							dispatch(getGameListFailed("Error in parsing response json"));
						} else if(url==="/api/kokoelmat/") {
							dispatch(getCollectionListFailed("Error in parsing response json"));
						} else if(url==="/api/kategoriat/") {
							dispatch(getCategoryListFailed("Error in parsing response json"));
						} else {
							console.log("fail_getlist_error, should never go here");
						}
					});
				} else {
					if(url==="/api/pelit/") {
						dispatch(getGameListFailed("Server responded with status:"+response.statusText));
					} else if(url==="/api/kokoelmat/") {
						dispatch(getCollectionListFailed("Server responded with status:"+response.statusText));
					} else if(url==="/api/kategoriat/") {
						dispatch(getCategoryListFailed("Server responded with status:"+response.statusText));
					} else {
						console.log("fail_getlist_status, should never go here");
					}

		  }}).catch(error => {
				dispatch(loadingDone());
				if(url==="/api/pelit/") {
					dispatch(getGameListFailed(error));
				} else if(url==="/api/kokoelmat/") {
					dispatch(getCollectionListFailed(error));
				} else if(url==="/api/kategoriat/") {
					dispatch(getCategoryListFailed(error));
				} else {
					console.log("fail_getlist, should never go here");
				}
			});		
		}
}

export const addToList = (item,token,url) => {
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
		return fetch(url,request).then(response => {
			if(response.ok) {
				if(url==="/api/pelit/") {
				response.json().then(data => {
					dispatch(addToGameListSuccess(data.message));					
				})
				} else if(url==="/api/kokoelmat/") {
				response.json().then(data => {
					dispatch(addToCollectionListSuccess(data.message));					
				})
				} else if(url==="/api/kategoriat/") {
				response.json().then(data => {
					dispatch(addToCategoryListSuccess(data.message));					
				})
				} else {
					console.log("fail_add_to_response, should never go here");
				}
				dispatch(getList(token,url));
			} else {
				if(url==="/api/pelit/") {
					dispatch(addToGameListFailed("Server responded with status:"+response.statusText));
				} else if(url==="/api/kokoelmat/") {
					dispatch(addToCollectionListFailed("Server responded with status:"+response.statusText));
				} else if(url==="/api/kategoriat/") {
					dispatch(addToCategoryListFailed("Server responded with status:"+response.statusText));
				} else {
					console.log("fail_add_to_status, should never go here");
				}
				dispatch(loadingDone());
			}
		}).catch(error => {
			if(url==="/api/pelit/") {
				dispatch(addToGameListFailed(error));
			} else if(url==="/api/kokoelmat/") {
				dispatch(addToCollectionListFailed(error));
			} else if(url==="/api/kategoriat/") {
				dispatch(addToCategoryListFailed(error));
			} else {
				console.log("fail_add_to_error, should never go here");
			}
			dispatch(loadingDone());
		})
	}
}

export const removeFromList = (id,token,url) => {
	return dispatch => {
		let request = {
			method:"DELETE",
			mode:"cors",
			credentials:"include",
			headers:{"Content-Type":"application/json",
					"token":token}
		}
		dispatch(fetchLoading());
		return fetch(url+id,request).then(response => {
			if(response.ok) {
				if(url==="/api/pelit/") {
					dispatch(removeFromGameListSuccess());
				} else if(url==="/api/kokoelmat/") {
					dispatch(removeFromCollectionListSuccess());
					dispatch(getList(token,"/api/pelit/"));	
				} else if(url==="/api/kategoriat/") {
					dispatch(removeFromCategoryListSuccess());
					dispatch(getList(token,"/api/pelit/"));	
				} else {
					console.log("fail_remove_response, should never go here");
				}
				dispatch(getList(token,url));	
			} else {
				if(url==="/api/pelit/") {
					dispatch(removeFromGameListFailed("Server responded with status:"+response.statusText));
				} else if(url==="/api/kokoelmat/") {
					dispatch(removeFromCollectionListFailed("Server responded with status:"+response.statusText));
				} else if(url==="/api/kategoriat/") {
					dispatch(removeFromCategoryListFailed("Server responded with status:"+response.statusText));
				} else {
					console.log("fail_remove_status, should never go here");
				}
				dispatch(loadingDone());
			}
		}).catch(error => {
			if(url==="/api/pelit/") {
				dispatch(removeFromGameListFailed(error));
			} else if(url==="/api/kokoelmat/") {
				dispatch(removeFromCollectionListFailed(error));
			} else if(url==="/api/kategoriat/") {
				dispatch(removeFromCategoryListFailed(error));
			} else {
				console.log("fail_remove_error, should never go here");
			}
			dispatch(loadingDone());
		})		
	}
}

export const editItem = (item,token,url) => {
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
		return fetch(url+item._id,request).then(response => {
			if(response.ok) {
				if(url==="/api/pelit/") {
					response.json().then(data => {
						dispatch(editGameListItemSuccess(data.message));	
					})
				} else if(url==="/api/kokoelmat/") {
					response.json().then(data => {
						dispatch(editCollectionListItemSuccess(data.message));	
					})
					dispatch(getList(token,"/api/pelit/"));	
				} else if(url==="/api/kategoriat/") {
					response.json().then(data => {
						dispatch(editCategoryListItemSuccess(data.message));	
					})
					dispatch(getList(token,"/api/pelit/"));	
				} else {
					console.log("fail_edit_response, should never go here");
				}
				dispatch(getList(token,url));
				
			} else {
				if(url==="/api/pelit/") {
					dispatch(editGameListItemFailed("Server responded with status:"+response.statusText));
				} else if(url==="/api/kokoelmat/") {
					dispatch(editCollectionListItemFailed("Server responded with status:"+response.statusText));
				} else if(url==="/api/kategoriat/") {
					dispatch(editCategoryListItemFailed("Server responded with status:"+response.statusText));
				} else {
					console.log("fail_edit_status, should never go here");
				}
				dispatch(loadingDone());
			}
		}).catch(error => {
			if(url==="/api/pelit/") {
				dispatch(editGameListItemFailed(error));
			} else if(url==="/api/kokoelmat/") {
				dispatch(editCollectionListItemFailed(error));
			} else if(url==="/api/kategoriat/") {
				dispatch(editCategoryListItemFailed(error));
			} else {
				console.log("fail_remove_error, should never go here");
			}
			dispatch(loadingDone());
		})
	}
}

//ACTION CREATORS

const getGameListSuccess = (gameList) => {
	return {
		type:GET_GAMELIST_SUCCESS,
		gameList:gameList
	}
}

const getGameListFailed = (error) => {
	return {
		type:GET_GAMELIST_FAILED,
		error:error
	}
}

const addToGameListSuccess = (message) => {
	return {
		type:ADD_TO_GAMELIST_SUCCESS,
		message:message
	}
}

const addToGameListFailed = (error) => {
	return {
		type:ADD_TO_GAMELIST_FAILED,
		error:error
	}	
}

const removeFromGameListSuccess = () => {
	return {
		type:REMOVE_FROM_GAMELIST_SUCCESS
	}
}

const removeFromGameListFailed = (error) => {
	return {
		type:REMOVE_FROM_GAMELIST_FAILED,
		error:error
	}
}

const editGameListItemSuccess = (message) => {
	return {
		type:EDIT_GAMELISTITEM_SUCCESS,
		message:message
	}
}

const editGameListItemFailed = (error) => {
	return {
		type:EDIT_GAMELISTITEM_FAILED,
		error:error
	}
}

const getCollectionListSuccess = (collectionList) => {
	return {
		type:GET_COLLECTIONLIST_SUCCESS,
		collectionList:collectionList
	}
}

const getCollectionListFailed = (error) => {
	return {
		type:GET_COLLECTIONLIST_FAILED,
		error:error
	}
}

const addToCollectionListSuccess = (message) => {
	return {
		type:ADD_TO_COLLECTIONLIST_SUCCESS,
		message:message
	}
}

const addToCollectionListFailed = (error) => {
	return {
		type:ADD_TO_COLLECTIONLIST_FAILED,
		error:error
	}	
}

const removeFromCollectionListSuccess = () => {
	return {
		type:REMOVE_FROM_COLLECTIONLIST_SUCCESS
	}
}

const removeFromCollectionListFailed = (error) => {
	return {
		type:REMOVE_FROM_COLLECTIONLIST_FAILED,
		error:error
	}
}

const editCollectionListItemSuccess = (message) => {
	return {
		type:EDIT_COLLECTIONLISTITEM_SUCCESS,
		message:message
	}
}

const editCollectionListItemFailed = (error) => {
	return {
		type:EDIT_COLLECTIONLISTITEM_FAILED,
		error:error
	}
}

const getCategoryListSuccess = (categoryList) => {
	return {
		type:GET_CATEGORYLIST_SUCCESS,
		categoryList:categoryList
	}
}

const getCategoryListFailed = (error) => {
	return {
		type:GET_CATEGORYLIST_FAILED,
		error:error
	}
}

const addToCategoryListSuccess = (message) => {
	return {
		type:ADD_TO_CATEGORYLIST_SUCCESS,
		message:message
	}
}

const addToCategoryListFailed = (error) => {
	return {
		type:ADD_TO_CATEGORYLIST_FAILED,
		error:error
	}	
}

const removeFromCategoryListSuccess = () => {
	return {
		type:REMOVE_FROM_CATEGORYLIST_SUCCESS
	}
}

const removeFromCategoryListFailed = (error) => {
	return {
		type:REMOVE_FROM_CATEGORYLIST_FAILED,
		error:error
	}
}

const editCategoryListItemSuccess = (message) => {
	return {
		type:EDIT_CATEGORYLISTITEM_SUCCESS,
		message:message
	}
}

const editCategoryListItemFailed = (error) => {
	return {
		type:EDIT_CATEGORYLISTITEM_FAILED,
		error:error
	}
}

export const logoutDone = () => {
	return {
		type:LOGOUT_DONE
	}
}

export const setGameCollection = (gameCollection) => {
	return {
		type:SET_GAMECOLLECTION_DONE,
		gameCollection:gameCollection
	}
}

export const setGamesPerPage = (gamesPerPage) => {
	return {
		type:SET_GAMES_PER_PAGE,
		gamesPerPage:gamesPerPage
	}
}