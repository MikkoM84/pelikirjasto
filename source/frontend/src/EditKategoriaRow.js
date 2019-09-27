import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class EditKategoriaRow extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			kategoria:props.item.kategoria
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
			kategoria:this.state.kategoria
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
							name="kategoria"
							onChange={this.onChange}
							value={this.state.kategoria}/>
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