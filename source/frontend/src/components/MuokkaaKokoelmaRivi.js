import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class MuokkaaKokoelmaRivi extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			kokoelma:props.item.kokoelma
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
			kokoelma:this.state.kokoelma
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
							name="kokoelma"
							onChange={this.onChange}
							value={this.state.kokoelma}/>
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