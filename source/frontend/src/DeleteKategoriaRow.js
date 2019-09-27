import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class DeleteKategoriaRow extends React.Component {
	
	remove = (event) => {
		this.props.handleRemove(event.target.name);
	}
	cancel = (event) => {
		this.props.cancel();
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>{this.props.item.kategoria}</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Cancel</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							name={this.props.item._id}
							onClick={this.remove}>Confirm</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}