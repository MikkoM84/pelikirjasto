import React from 'react';
import './App.css';
import AddGameForm from './components/AddGameForm';
import GameList from './components/GameList';
import CollectionAndCategoryForm from './components/CollectionAndCategoryForm';
import CollectionAndCategoryList from './components/CollectionAndCategoryList';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import {connect} from 'react-redux';

class App extends React.Component {
	
	render() {
	  return (
		<div className="App">
			<Navbar/>
			<Switch>
				<Route exact path="/" render={() =>
					this.props.isLogged ?
					(<Redirect to="/pelit" />) :
					(<LoginForm />)
				}/>
				<Route path="/pelit" render={() =>
					this.props.isLogged ?
					(<GameList/>) :
					(<Redirect to="/" />)
				}/>
				<Route path="/lisaaPeli" render={() =>
					this.props.isLogged ?
					(<AddGameForm />) :
					(<Redirect to="/" />)
				}/>
				<Route path="/kokoelmat" render={() =>
					this.props.isLogged ?
					(<div><CollectionAndCategoryForm />
					<CollectionAndCategoryList /></div>) :
					(<Redirect to="/" />)
				}/>
				<Route path="/kategoriat" render={() =>
					this.props.isLogged ?
					(<div><CollectionAndCategoryForm />
					<CollectionAndCategoryList /></div>) :
					(<Redirect to="/" />)
				}/>
				<Route render={() =>
					(<Redirect to="/" />)
				}/>
			</Switch>			
		</div>
	  );
	}
}

const mapStateToProps = (state) =>  {
	return {
		isLogged:state.login.isLogged
	}
}

export default withRouter(connect(mapStateToProps)(App));
