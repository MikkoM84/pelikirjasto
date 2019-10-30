import {
	GET_GAMELIST_SUCCESS,
	GET_GAMELIST_FAILED,
	ADD_TO_GAMELIST_SUCCESS,
	ADD_TO_GAMELIST_FAILED,
	REMOVE_FROM_GAMELIST_SUCCESS,
	REMOVE_FROM_GAMELIST_FAILED,
	EDIT_GAMELISTITEM_SUCCESS,
	EDIT_GAMELISTITEM_FAILED,
	GET_COLLECTIONLIST_SUCCESS,
	GET_COLLECTIONLIST_FAILED,
	ADD_TO_COLLECTIONLIST_SUCCESS,
	ADD_TO_COLLECTIONLIST_FAILED,
	REMOVE_FROM_COLLECTIONLIST_SUCCESS,
	REMOVE_FROM_COLLECTIONLIST_FAILED,
	EDIT_COLLECTIONLISTITEM_SUCCESS,
	EDIT_COLLECTIONLISTITEM_FAILED,
	GET_CATEGORYLIST_SUCCESS,
	GET_CATEGORYLIST_FAILED,
	ADD_TO_CATEGORYLIST_SUCCESS,
	ADD_TO_CATEGORYLIST_FAILED,
	REMOVE_FROM_CATEGORYLIST_SUCCESS,
	REMOVE_FROM_CATEGORYLIST_FAILED,
	EDIT_CATEGORYLISTITEM_SUCCESS,
	EDIT_CATEGORYLISTITEM_FAILED,
	LOGOUT_DONE,
	SET_GAMECOLLECTION_DONE,
	SET_GAMES_PER_PAGE
} from '../actions/listActions';

const getInitialState = () => {
	if(sessionStorage.getItem("liststate")) {
		let state = JSON.parse(sessionStorage.getItem("liststate"))
		return state;
	} else {
		return {
			pelilista:[],
			kokoelmalista:[],
			kategorialista:[],
			error:"",
			message:"",
			pelikokoelma:"",
			sivulla:10
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("liststate",JSON.stringify(state));
}

const initialState = getInitialState();

const listReducer = (state = initialState, action) => {
	let tempState = {};
	switch(action.type) {
		case GET_GAMELIST_SUCCESS:
			tempState = {
				...state,
				error:"",
				pelilista:action.pelilista
			}
			saveToStorage(tempState);
			return tempState;
		case GET_GAMELIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;	
		case ADD_TO_GAMELIST_SUCCESS:
			tempState = {
				...state,
				error:"",
				message:action.message
			}
			saveToStorage(tempState);		
			return tempState;
		case ADD_TO_GAMELIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case REMOVE_FROM_GAMELIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);		
			return tempState;
		case REMOVE_FROM_GAMELIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case EDIT_GAMELISTITEM_SUCCESS:
			tempState = {
				...state,
				error:"",
				message:action.message
			}
			saveToStorage(tempState);		
			return tempState;
		case EDIT_GAMELISTITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case GET_COLLECTIONLIST_SUCCESS:
			tempState = {
				...state,
				error:"",
				kokoelmalista:action.kokoelmalista
			}
			saveToStorage(tempState);
			return tempState;
		case GET_COLLECTIONLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;	
		case ADD_TO_COLLECTIONLIST_SUCCESS:
			tempState = {
				...state,
				error:"",
				message:action.message
			}
			saveToStorage(tempState);		
			return tempState;
		case ADD_TO_COLLECTIONLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case REMOVE_FROM_COLLECTIONLIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);		
			return tempState;
		case REMOVE_FROM_COLLECTIONLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case EDIT_COLLECTIONLISTITEM_SUCCESS:
			tempState = {
				...state,
				error:"",
				message:action.message
			}
			saveToStorage(tempState);		
			return tempState;
		case EDIT_COLLECTIONLISTITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case GET_CATEGORYLIST_SUCCESS:
			tempState = {
				...state,
				error:"",
				kategorialista:action.kategorialista
			}
			saveToStorage(tempState);
			return tempState;
		case GET_CATEGORYLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;	
		case ADD_TO_CATEGORYLIST_SUCCESS:
			tempState = {
				...state,
				error:"",
				message:action.message
			}
			saveToStorage(tempState);		
			return tempState;
		case ADD_TO_CATEGORYLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case REMOVE_FROM_CATEGORYLIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveToStorage(tempState);		
			return tempState;
		case REMOVE_FROM_CATEGORYLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case EDIT_CATEGORYLISTITEM_SUCCESS:
			tempState = {
				...state,
				error:"",
				message:action.message
			}
			saveToStorage(tempState);		
			return tempState;
		case EDIT_CATEGORYLISTITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);		
			return tempState;
		case LOGOUT_DONE:
			tempState = {
				pelilista:[],
				kokoelmalista:[],
				kategorialista:[],
				error:"",
				message:"",
				pelikokoelma:""
			}
			saveToStorage(tempState);		
			return tempState;
		case SET_GAMECOLLECTION_DONE:
			tempState = {
				...state,
				pelikokoelma:action.pelikokoelma
			}
			saveToStorage(tempState);		
			return tempState;
		case SET_GAMES_PER_PAGE:
			tempState = {
				...state,
				sivulla:action.sivulla
			}
			saveToStorage(tempState);		
			return tempState;
		default:
			return state;
	}
}

export default listReducer;