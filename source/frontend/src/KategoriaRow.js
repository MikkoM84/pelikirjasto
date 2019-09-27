import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class KategoriaRow extends React.Component {
	
	remove = (event) => {
		this.props.removeFromList(event.target.name);
	}
	
	edit = (event) => {
		this.props.edit(event.target.id);
	}
	
	render() {
		return(
				
			<Table.Row>
				<Table.Cell>{this.props.item.kategoria}</Table.Cell>
				<Table.Cell>
					<Button name={this.props.item._id}
							onClick={this.remove}>Remove</Button>
				</Table.Cell>
				<Table.Cell>
					<Button id={this.props.item._id}
							onClick={this.edit}>Edit</Button>
				</Table.Cell>
			</Table.Row>
		)
	}
}