import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => {
	  this.setState({ activeItem: name });
	  this.props.getList("/api/pelit/");
  }
  
  logout = () => {
	this.props.logout();
  }

  render() {
    const { activeItem } = this.state
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
			{navbar}
		</div>
    )
  }
}

export default NavBar;