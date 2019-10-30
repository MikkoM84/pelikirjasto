import React from 'react';
import { Menu,Header,Icon } from 'semantic-ui-react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {onLogout} from '../actions/loginActions';

class Navbar extends React.Component {
  
	logout = () => {
		this.props.dispatch(onLogout(this.props.token));
	}
  
	render() {
		let status = "";
		if(this.props.loading) {
			status = <div>Loading... <Icon loading name='spinner' /></div>;
		}
		if(this.props.error.length > 0) {
			
			status = <div style={{color:"red"}}>{this.props.error}</div>;
		}
		let navbar = <div></div>;
		if(this.props.isLogged) {
			navbar =
			<Menu widths="five">
				<Menu.Item
					as={Link} 
					to='pelit'
					name='pelit'
					active={this.props.location.pathname === '/pelit'}
				>
					Pelit
				</Menu.Item>
				<Menu.Item 
					as={Link} 
					to='lisaaPeli' 
					name='lisaaPeli' 
					active={this.props.location.pathname === '/lisaaPeli'} 
				>
					Lisää peli
				</Menu.Item>
				<Menu.Item
					as={Link} 
					to='kokoelmat'
					name='kokoelmat'
					active={this.props.location.pathname === '/kokoelmat'}
				>
					Kokoelmat
				</Menu.Item>
				<Menu.Item
					as={Link} 
					to='kategoriat'
					name='kategoriat'
					active={this.props.location.pathname === '/kategoriat'}
				>
					Kategoriat
				</Menu.Item>
				<Menu.Item
					as={Link} 
					to="/" 
					name='logout'
					onClick={this.logout}
				>
					Kirjaudu ulos
				</Menu.Item>
			</Menu>
		}

		return (
			<div>
				<Header><h1>Pelikirjasto</h1></Header>
				{navbar}
				<h2>{status}</h2>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let error = ""
	if(state.list.error.length > 0) {
		error = state.list.error
	}
	if(state.login.error.length > 0) {
		error = state.login.error
	}
	return {
		isLogged:state.login.isLogged,
		token:state.login.token,
		loading:state.login.loading,
		error:error,
		register:state.login.register
	}
}

export default withRouter(connect(mapStateToProps)(Navbar));