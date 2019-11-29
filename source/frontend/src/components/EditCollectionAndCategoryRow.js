import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditCollectionAndCategoryRow extends React.Component {
	
	constructor(props) {
		super(props);
		if(this.props.url === "/kokoelmat") {
			this.state = {
				collOrCat:props.item.collectionName
			}
		} else {
			this.state = {
				collOrCat:props.item.category
			}
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	editItem = () => {
		let item = {};
		if(this.props.url === "/kokoelmat" ) {
			item = {
				_id:this.props.item._id,
				collectionName:this.state.collOrCat
			}
		} else {
			item = {
				_id:this.props.item._id,
				category:this.state.collOrCat
			}
		}
		this.props.editItem(item);
	}
	cancel = () => {
		this.props.cancel();
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>
					<input type="text"
							name="collOrCat"
							required
							onChange={this.onChange}
							value={this.state.collOrCat}/>
				</Table.Cell>
				
				<Table.Cell>
					<Button color="green"
							name={this.props.item._id}
							onClick={this.editItem}
							disabled={!this.state.collOrCat}>Tallenna</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Peruuta</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}