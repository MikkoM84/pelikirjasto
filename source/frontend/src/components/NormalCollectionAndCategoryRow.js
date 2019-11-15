import React from 'react';
import {Table,Icon} from 'semantic-ui-react';

export default class NormalCollectionAndCategoryRow extends React.Component {
	
	remove = (event) => {
		this.props.removeFromList(event.target.id);
	}
	
	edit = (event) => {
		this.props.edit(event.target.id);
	}
	
	render() {
		return(
				
			<Table.Row>
				<Table.Cell>{this.props.url === "/kokoelmat" ? this.props.item.collectionName : this.props.item.category}</Table.Cell>
				<Table.Cell id={this.props.item._id} onClick={this.remove}>
					<Icon name="remove" id={this.props.item._id} onClick={this.remove}/>
				</Table.Cell>
				<Table.Cell id={this.props.item._id} onClick={this.edit}>
					<Icon name="edit" id={this.props.item._id} onClick={this.edit}/>
				</Table.Cell>
			</Table.Row>
		)
	}
}