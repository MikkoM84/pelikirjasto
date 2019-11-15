import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditCollectionAndCategoryRow extends React.Component {
	
	constructor(props) {
		super(props);
		if(this.props.url === "/kokoelmat") {
			this.state = {
				koka:props.item.collectionName
			}
		} else {
			this.state = {
				koka:props.item.category
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
				collectionName:this.state.koka
			}
		} else {
			item = {
				_id:this.props.item._id,
				category:this.state.koka
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
							name="koka"
							required
							onChange={this.onChange}
							value={this.state.koka}/>
				</Table.Cell>
				
				<Table.Cell>
					<Button color="green"
							name={this.props.item._id}
							onClick={this.editItem}
							disabled={!this.state.koka}>Tallenna</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Peruuta</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}