import React from 'react';
import {Form,Button,Dropdown} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addToList} from '../actions/listActions';
		
class LisaaPeliForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			kokoelma:"",
			nimi:"",
			kuvaus:"",
			kategoriat:[]
		}
	}
	
	handleSelect = (event,data) => {
		let state = {};
		state[data.name] = data.value;
		this.setState(state);
	}

	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	onSubmit = (event) => {
		event.preventDefault();
		if(this.state.kokoelma === "") {
			return alert("Valitse kokoelma");
		}
		let item = {
			kokoelma:this.state.kokoelma,
			nimi:this.state.nimi,
			kuvaus:this.state.kuvaus,
			kategoriat:this.state.kategoriat
		};
		this.props.dispatch(addToList(item,this.props.token, "/api/pelit/"));
//		this.props.addToList(item, "/api/pelit/");
//		console.log(item);
		this.setState({
			kokoelma:"",
			nimi:"",
			kuvaus:"",
			kategoriat:[]
		})
	}
	
	render() {
		let kokoelmat = [];
		for(let i=0;i<this.props.kokoelmalista.length;i++) {
			kokoelmat.push({
				"key":this.props.kokoelmalista[i].kokoelma,
				"text":this.props.kokoelmalista[i].kokoelma,
				"value":this.props.kokoelmalista[i].kokoelma,
			})
		}
		let kat = [];
		for(let i=0;i<this.props.kategorialista.length;i++) {
			kat.push({
				"key":this.props.kategorialista[i].kategoria,
				"text":this.props.kategorialista[i].kategoria,
				"value":this.props.kategorialista[i].kategoria,
			})
		}
		
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="kokoelma">Kokoelma: <span style={{color: 'red'}}>*</span></label>
					<Dropdown placeholder="Valitse kokoelma"
							  onChange={this.handleSelect}
							  name="kokoelma"
							  fluid selection 
							  options={kokoelmat}
							  value={this.state.kokoelma}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="nimi">Pelin nimi: <span style={{color: 'red'}}>*</span></label>
					<input type="text"
							name="nimi"
							onChange={this.onChange}
							value={this.state.nimi}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="kuvaus">Pelin kuvaus:</label>
					<input type="text"
							name="kuvaus"
							onChange={this.onChange}
							value={this.state.kuvaus}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="kategoriat">Kategoriat:</label>
					<Dropdown placeholder="Valitse kategoriat"
							  onChange={this.handleSelect}
							  name="kategoriat"
							  fluid selection multiple
							  options={kat}
							  value={this.state.kategoriat}/>
				</Form.Field>
				
				<Button type="submit" disabled={!this.state.nimi || !this.state.kokoelma}>Lisää</Button>
			</Form>
		)
	}
}
/*
<Form.Field>
	<Dropdown placeholder="Valitse kokoelma"
		onChange={this.handleSelect}
		name="kokoelma"
		fluid
		selection
		options={kokoelmat}
		value={this.state.kokoelma}
	  />
</Form.Field>
*/

const mapStateToProps = (state) => {
	return {
		pelilista:state.list.pelilista,
		kokoelmalista:state.list.kokoelmalista,
		kategorialista:state.list.kategorialista,
		token:state.login.token
	}
}

export default withRouter(connect(mapStateToProps)(LisaaPeliForm));