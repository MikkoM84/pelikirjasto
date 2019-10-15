import React from 'react';
import { Menu,Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {onLogout} from '../actions/loginActions';
//import {getList} from '../actions/listActions';

class Navbar extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => {
	  this.setState({ activeItem: name });
//	  this.props.dispatch(getList("/api/pelit/"));
  }
  
  logout = () => {
	this.props.dispatch(onLogout(this.props.token));
  }

  render() {
	  let status = "";
	  if(this.props.loading) {
			status = "Loading...";
		}
		if(this.props.error.length > 0) {
			status = this.props.error;
		}
    const { activeItem } = this.state;
	let navbar = <div></div>;
		if(this.props.isLogged) {
			navbar =
			<Menu>
			<Menu.Item
			  as={Link} to='pelit'
			  name='pelit'
			  active={activeItem === 'pelit'}
			  onClick={this.handleItemClick}
			>
			  Pelit
			</Menu.Item>

			<Menu.Item 
			  as={Link} to='lisaaPeli' name='lisaaPeli' active={activeItem === 'lisaaPeli'} 
			  onClick={this.handleItemClick}>
			  Lisää peli
			</Menu.Item>

			<Menu.Item
			  as={Link} to='kokoelmat'
			  name='kokoelmat'
			  active={activeItem === 'kokoelmat'}
			  onClick={this.handleItemClick}
			>
			  Kokoelmat
			</Menu.Item>
			
			<Menu.Item
			  as={Link} to='kategoriat'
			  name='kategoriat'
			  active={activeItem === 'kategoriat'}
			  onClick={this.handleItemClick}
			>
			  Kategoriat
			</Menu.Item>
			<Menu.Item
			  as={Link} to="/" 
			  name='logout'
			  active={activeItem === 'logout'}
			  onClick={this.logout}
			>
			  Kirjaudu ulos
			</Menu.Item>
		  </Menu>
		}

    return (
		<div>
			<Header><h1>Pelikirjasto</h1></Header>
			<h2>{status}</h2>
			{navbar}
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
		error:error
	}
}

export default connect(mapStateToProps)(Navbar);