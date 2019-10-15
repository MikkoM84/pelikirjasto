import React from 'react';
import './App.css';
import LisaaPeliForm from './components/LisaaPeliForm';
import PeliLista from './components/PeliLista';
import KokoelmatForm from './components/KokoelmatForm';
import KokoelmaLista from './components/KokoelmaLista';
import KategoriatForm from './components/KategoriatForm';
import KategoriaLista from './components/KategoriaLista';
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
					(<PeliLista/>) :
					(<Redirect to="/" />)
				}/>
				<Route path="/lisaaPeli" render={() =>
					this.props.isLogged ?
					(<LisaaPeliForm />) :
					(<Redirect to="/" />)
				}/>
				<Route path="/kokoelmat" render={() =>
					this.props.isLogged ?
					(<div><KokoelmatForm />
					<KokoelmaLista /></div>) :
					(<Redirect to="/" />)
				}/>
				<Route path="/kategoriat" render={() =>
					this.props.isLogged ?
					(<div><KategoriatForm />
					<KategoriaLista /></div>) :
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
