import React from 'react';
import {Table,Button,Dropdown} from 'semantic-ui-react';


export default class EditRow extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			kokoelma:props.item.kokoelma,
			nimi:props.item.nimi,
			kuvaus:props.item.kuvaus,
			kategoriat:props.item.kategoriat
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	editItem = () => {
		let item = {
			_id:this.props.item._id,
			kokoelma:this.state.kokoelma,
			nimi:this.state.nimi,
			kuvaus:this.state.kuvaus,
			kategoriat:this.state.kategoriat
		}
		this.props.editItem(item);
	}
	cancel = () => {
		this.props.cancel();
	}
	
	handleSelect = (event,data) => {
		let state = {};
		state[data.name] = data.value;
		this.setState(state);
	}
	
	render() {
		let kat = [];
		let kok = [];
		for(let i=0;i<this.props.kategorialista.length;i++) {
			kat.push({
				"key":this.props.kategorialista[i].kategoria,
				"text":this.props.kategorialista[i].kategoria,
				"value":this.props.kategorialista[i].kategoria,
			})
		}
		for(let i=0;i<this.props.kokoelmalista.length;i++) {
			kok.push({
				"key":this.props.kokoelmalista[i].kokoelma,
				"text":this.props.kokoelmalista[i].kokoelma,
				"value":this.props.kokoelmalista[i].kokoelma,
			})
		}
		return(
			<Table.Row>
				<Table.Cell>
					<Dropdown placeholder="Valitse kokoelma"
							  onChange={this.handleSelect}
							  name="kokoelma"
							  fluid selection
							  options={kok}
							  value={this.state.kokoelma}/>
				</Table.Cell>
				<Table.Cell>
					<input type="text"
							name="nimi"
							onChange={this.onChange}
							value={this.state.nimi}/>	
				</Table.Cell>
				<Table.Cell>
					<input type="text"
							name="kuvaus"
							onChange={this.onChange}
							value={this.state.kuvaus}/>	
				</Table.Cell>
				<Table.Cell>
					<Dropdown placeholder="Valitse kategoriat"
							  onChange={this.handleSelect}
							  name="kategoriat"
							  fluid selection multiple
							  options={kat}
							  value={this.state.kategoriat}/>
					
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							name={this.props.item._id}
							onClick={this.editItem}>Save</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Cancel</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}