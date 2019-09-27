import React from 'react';
import {Form,Button} from 'semantic-ui-react';

export default class LoginForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	click = (event) => {
		event.preventDefault();
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		if (user.username.length < 4 || user.password.length < 8) {
			alert("Username must be atleast four characters and password eight characters long");
			return;
		}
		if(event.target.name === "register") {
			this.props.register(user);
		} else {
			this.props.login(user);
		}
	}
	
	render() {
		return(
			<div><h1>Pelikirjasto</h1>
			<Form>
				<Form.Field>
					<label htmlFor="username">Käyttäjänimi:</label>
					<input type="text"
							name="username"
							required={true}
							onChange={this.onChange}
							value={this.state.username}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Salasana:</label>
					<input type="password"
							name="password"
							required={true}
							onChange={this.onChange}
							value={this.state.password}/>
				</Form.Field>
				<Button name="login" onClick={this.click}>Kirjaudu</Button>
				<Button name="register" onClick={this.click}>Rekisteröidy</Button>
			</Form> </div>
		)
	}
}