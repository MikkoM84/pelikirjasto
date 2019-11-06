import React from 'react';
import {Grid,Form,Button,Segment,Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {onLogin,onRegister} from '../actions/loginActions';

class LoginForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:"",
			errormsg1:null,
			errormsg2:null,
			visible:true,
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	handleDismiss = () => {
		this.setState({ visible: false })
	}
	
	click = (event) => {
		event.preventDefault();
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		let msg1 = null;
		let msg2 = null;
		if ( user.username.length < 4 || user.password.length < 8 ) {
			if ( user.username.length < 4 ) {
				msg1 = "Käyttäjänimen pitää olla vähintään 4 merkkiä pitkä.";
			}
			if ( user.password.length < 8 ) {
				msg2 = "Salasanan pitää olla vähintään 8 merkkiä pitkä.";
			}
		} else if(event.target.name === "register") {
			this.props.dispatch(onRegister(user));
		} else {
			this.props.dispatch(onLogin(user));
		}
		this.setState({
			errormsg1:msg1,
			errormsg2:msg2
		});
		if(this.props.register.length > 0 || this.props.error.length > 0 ) {
			this.setState({visible:true});
		}
	}
	
	render() {
		let message = null;
		if(this.props.error.length > 0) {
			message = <Message
				error
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				header='Virhe'
				content={this.props.error}
			  />;
		}
		if(this.props.register.length > 0) {
			  message = <Message
				success
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				header='Rekisteröityminen onnistui'
				content='Voit nyt kirjautua sisään valitsemallasi käyttäjänimellä'
			  />;
		}
		return(
			<Grid textAlign='center' verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Form >
						<Segment stacked>
							<Form.Input 
								error={this.state.errormsg1}
								fluid
								label='Käyttäjänimi'
								placeholder='Käyttäjänimi'
								type="text"
								name="username"
								required={true}
								onChange={this.onChange}
								value={this.state.username}
							/>
							<Form.Input 
								error={this.state.errormsg2}
								fluid
								label='Salasana'
								placeholder='Salasana'
								type="password"
								name="password"
								required={true}
								onChange={this.onChange}
								value={this.state.password}
							/>
							<Button name="login" onClick={this.click}>Kirjaudu</Button>
							<Button name="register" onClick={this.click}>Rekisteröidy</Button>
								
						</Segment>
					</Form>
					{message}
				</Grid.Column>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error:state.login.error,
		register:state.login.register
	}
}

export default connect(mapStateToProps)(LoginForm);