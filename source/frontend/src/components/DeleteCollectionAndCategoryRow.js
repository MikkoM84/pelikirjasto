import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class DeleteCollectionAndCategoryRow extends React.Component {
	
	remove = (event) => {
		this.props.handleRemove(event.target.id);
	}
	cancel = (event) => {
		this.props.cancel();
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>{this.props.url === "/kokoelmat" ? this.props.item.collectionName : this.props.item.category}</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Peruuta</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							id={this.props.item._id}
							onClick={this.remove}>Vahvista</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}