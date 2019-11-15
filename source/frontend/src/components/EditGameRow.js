import React from 'react';
import {Table,Button,Dropdown,Input} from 'semantic-ui-react';


export default class EditGameRow extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			collectionName:props.item.collectionName,
			game:props.item.game,
			description:props.item.description,
			categories:props.item.categories
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
			collectionName:this.state.collectionName,
			game:this.state.game,
			description:this.state.description,
			categories:this.state.categories
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
		
		return(
			<Table.Row>
				<Table.Cell>
					<Dropdown placeholder="Valitse kokoelma"
							  onChange={this.handleSelect}
							  name="collectionName"
							  fluid selection
							  options={this.props.collectionList}
							  value={this.state.collectionName}/>
				</Table.Cell>
				<Table.Cell>
					<Input type="text"
							name="game"
							required
							fluid
							onChange={this.onChange}
							value={this.state.game}/>	
				</Table.Cell>
				<Table.Cell>
					<Input type="text"
							name="description"
							fluid
							onChange={this.onChange}
							value={this.state.description}/>	
				</Table.Cell>
				<Table.Cell>
					<Dropdown placeholder="Valitse kategoriat"
							  onChange={this.handleSelect}
							  name="categories"
							  fluid selection multiple
							  options={this.props.categoryList}
							  value={this.state.categories}/>
					
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							name={this.props.item._id}
							onClick={this.editItem}
							disabled={!this.state.game}>Tallenna</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Peruuta</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}