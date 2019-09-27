import React from 'react';
import LisaaPeliForm from './LisaaPeliForm';
import PeliLista from './PeliLista';
import KokoelmatForm from './KokoelmatForm';
import KokoelmaLista from './KokoelmaLista';
import KategoriatForm from './KategoriatForm';
import KategoriaLista from './KategoriaLista';
import './App.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Navbar from './Navbar';
import LoginForm from './LoginForm';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			pelilista:[],
			kokoelmalista:[],
			kategorialista:[],
			isLogged:false,
			token:""
		}
	}
	
	componentDidMount() {
//		console.log("Component Did Mount = App.js");
		if(sessionStorage.getItem("state")) {
			let tempState = JSON.parse(sessionStorage.getItem("state"));
			this.setState(tempState, () => {
				if(this.state.isLogged) {
					this.getList("/api/pelit/");
					this.getList("/api/kokoelmat/");
					this.getList("/api/kategoriat/");
				}
			});
		}		
	}
	
	saveToStorage = () => {
		sessionStorage.setItem("state", JSON.stringify(this.state));
	}
	
	//Login API
	
	handleStatus = (status) => {
		if(status === 403) {
			this.setState({
				token:"",
				isLogged:false
			}, () => {this.saveToStorage()});
		}
	}
	
	register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/register", request).then(response => {
			if(response.ok) {
				alert("Register success!");
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log(error);
		})
	}
	login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/login", request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						isLogged:true,
						token:data.token
					}, () => {
						this.getList("/api/pelit/");
						this.getList("/api/kokoelmat/");
						this.getList("/api/kategoriat/");
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Error parsing JSON");
				})
			} else {
				console.log("Server responded with status:"+response.status);
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	logout = () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json", "token":this.state.token}
		}
		fetch("/logout",request).then(response => {
			if(response.ok) {
				this.setState({
					token:"",
					isLogged:false,
					pelilista:[],
					kokoelmalista:[],
					kategorialista:[]
				}, () => {this.saveToStorage()});
			}
		}).catch(error => {
			console.log(error);
		})
	}
	
	//  API
	getList = (url) => {
		console.log(url);
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-Type":"application/json",
						"token":this.state.token}
		}
		fetch(url,request).then(response => {
			if(response.ok) {
				console.log("url:" + url);
				response.json().then(data => {
					if(url==="/api/pelit/") {
						this.setState({
							pelilista:data
						})
					} else if(url==="/api/kokoelmat/") {
						this.setState({
							kokoelmalista:data
						})
					} else if(url==="/api/kategoriat/") {
						this.setState({
							kategorialista:data
						})
					} else {
						console.log("fail");
					}
				}, () => {
					this.saveToStorage();
			}).catch(error => {
					console.log("Error in parsing response json");
				});
			} else {
				console.log("Server responded with status: " + response.statusText);
				this.handleStatus(response.status);
			}
			console.log("pelilista");
			console.log(this.state.pelilista);
			
			console.log("kokoelmalista");
					console.log(this.state.kokoelmalista);
			console.log("kategorialista");
					console.log(this.state.kategorialista);
		}).catch(error => {
			console.log(error);
		});
	}
	
	addToList = (item, url) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
						"token":this.state.token},
			body:JSON.stringify(item)
		}
		fetch(url,request).then(response => {
			console.log(url);
			console.log(request);
			console.log(item);
			if(response.ok) {
				console.log("addToList success");
				this.getList(url);
			} else {
				console.log("Server responded with status: " + response.statusText);
				this.handleStatus(response.status);
			}
		}).catch(error => {
			console.log(error);
		});
	}
	
	removeFromList = (id,url) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-Type":"application/json",
						"token":this.state.token}
		}
		fetch(url+id,request).then(response => {
			console.log(url);
			console.log("id:" +id);
			if(response.ok) {
				console.log("removeFromList success");
				this.getList(url);
			} else {
				console.log("Server responded with status: " + response.statusText);
				this.handleStatus(response.status);
			}
		}).catch(error => {
			console.log(error);
		});
	}
	
	editItem = (item,url) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
						"token":this.state.token},
			body:JSON.stringify(item)
		}
		fetch(url+item._id,request).then(response => {
			if(response.ok) {
				console.log("editItem success");
				this.getList(url);
			} else {
				console.log("Server responded with status: " + response.statusText);
				this.handleStatus(response.status);
			}
		}).catch(error => {
			console.log(error);
		});
	}
	
	render() {
	  return (
		<div className="App">
			<Navbar isLogged={this.state.isLogged} logout={this.logout}
					getList={this.getList}/>
			<Switch>
				<Route exact path="/" render={() =>
					this.state.isLogged ?
					<Redirect to="/pelit" /> :
					<LoginForm register={this.register}
								login={this.login}/>
				}/>
				<Route path="/pelit" render={() =>
					this.state.isLogged ?
					<PeliLista pelilista={this.state.pelilista}
					removeFromList={this.removeFromList}
					editItem={this.editItem}
					kokoelmalista={this.state.kokoelmalista}
					kategorialista={this.state.kategorialista}/> :
					<Redirect to="/" />
				}/>
				<Route path="/lisaaPeli" render={() =>
					this.state.isLogged ?
					<LisaaPeliForm addToList={this.addToList}
					kokoelmalista={this.state.kokoelmalista}
					kategorialista={this.state.kategorialista}/> :
					<Redirect to="/" />
				}/>
				<Route path="/kokoelmat" render={() =>
					this.state.isLogged ?
					<div><KokoelmatForm addToList={this.addToList}/>
					<KokoelmaLista kokoelmalista={this.state.kokoelmalista}
					removeFromList={this.removeFromList}
					editItem={this.editItem}/></div> :
					<Redirect to="/" />
				}/>
				<Route path="/kategoriat" render={() =>
					this.state.isLogged ?
					<div><KategoriatForm addToList={this.addToList}/>
					<KategoriaLista kategorialista={this.state.kategorialista}
					removeFromList={this.removeFromList}
					editItem={this.editItem}/></div> :
					<Redirect to="/" />
				}/>
				<Route render={() =>
					<Redirect to="/" />
				}/>
			</Switch>			
		</div>
	  );
	}
}

export default withRouter(App);
