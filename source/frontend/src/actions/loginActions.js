import {getList, logoutDone} from './listActions';

//ACTION CONSTANTS

export const FETCH_LOADING = "FETCH_LOADING"
export const LOADING_DONE = "LOADING_DONE"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILED = "REGISTER_FAILED"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"

//ACTIONS

export const onLogin = (user) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(fetchLoading());
		return fetch("/login", request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					dispatch(loginSuccess(data.token));
					dispatch(getList(data.token,"/api/pelit/"));
					dispatch(getList(data.token,"/api/kokoelmat/"));
					dispatch(getList(data.token,"/api/kategoriat/"));
//					console.log(data);
				}).catch(error => {
					dispatch(loginFailed("Error parsing JSON"));
					console.log(error);
				})
			} else {
				response.json().then(data => {
					dispatch(loginFailed(data.message));
				})
			}
		}).catch(error => {
			dispatch(loginFailed(error));
		})		
	}
}

export const onRegister = (user) => {
	return dispatch => {
	  let request = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json"},
		  body:JSON.stringify(user)
	  }
	  dispatch(fetchLoading());
	  return fetch("/register", request).then(response => {
		  if(response.ok) {
			//  alert("Register success!");
			response.json().then(data => {
			  dispatch(registerSuccess(data.message));
			})
		  } else {
			//  dispatch(registerFailed("Server responded with status:"+response.statusText));
			response.json().then(data => {
				dispatch(registerFailed(data.message));
			})
		  }
	  }).catch(error => {
		  dispatch(registerFailed(error));
	  })		
	}
}

export const onLogout = (token) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			credentials:"include",
			headers:{"Content-Type":"application/json",
					"token":token}
		}
		dispatch(fetchLoading());
		return fetch("/logout",request).then(response => {
			dispatch(logoutSuccess());
			dispatch(logoutDone());
		}).catch(error => {
			dispatch(logoutFailed(error));
			dispatch(logoutDone());
		})		
	}
}


//ACTION CREATORS

export const fetchLoading = () => {
	return {
		type:FETCH_LOADING
	}
}

export const loadingDone = () => {
	return {
		type:LOADING_DONE
	}	
}


const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

const registerSuccess = (data) => {
	return {
		type:REGISTER_SUCCESS,
		register:data
	}
}

const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}
