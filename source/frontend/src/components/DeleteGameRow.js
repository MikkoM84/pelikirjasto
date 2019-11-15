import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class DeleteGameRow extends React.Component {
	
	remove = (event) => {
		this.props.handleRemove(event.target.name);
	}
	cancel = (event) => {
		this.props.cancel();
	}
	
	render() {
		let categories;
		if(this.props.item.categories.length > 1 ){
			categories = <Table.Cell>{(this.props.item.categories).sort().reduce((accumulator,item,index) => {
				return index===0 ? item : accumulator + ", " + String(item)
			})}</Table.Cell>
		} else {
			categories = <Table.Cell>{this.props.item.categories}</Table.Cell>
		}
		return(
			<Table.Row>
				<Table.Cell>{this.props.item.game}</Table.Cell>
				<Table.Cell>{this.props.item.description}</Table.Cell>
				{categories}
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Peruuta</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							name={this.props.item._id}
							onClick={this.remove}>Vahvista</Button>
				</Table.Cell>
			</Table.Row>
		)		
	}
}