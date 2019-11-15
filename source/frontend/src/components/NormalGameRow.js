import React from 'react';
import {Table,Icon} from 'semantic-ui-react';

export default class NormalGameRow extends React.Component {
	
	remove = (event) => {
		this.props.removeFromList(event.target.id);
	}
	
	edit = (event) => {
		this.props.edit(event.target.id);
	}
	
	render() {
		let categories;
		if(this.props.item.categories.length > 1 ){
			categories = <Table.Cell>{([...this.props.item.categories]).sort()
			.reduce((accumulator,item,index) => {return index===0 ? item : accumulator + ", " + String(item)})}</Table.Cell>
		} else {
			categories = <Table.Cell>{this.props.item.categories}</Table.Cell>
		}
		return(
				
			<Table.Row>
				{ this.props.showCollection ? <Table.Cell></Table.Cell> : null }
				<Table.Cell>{this.props.item.game}</Table.Cell>
				<Table.Cell>{this.props.item.description}</Table.Cell>
				{categories}
				<Table.Cell id={this.props.item._id} onClick={this.remove}>
					<Icon name='remove' id={this.props.item._id} onClick={this.remove}/>
				</Table.Cell>
				<Table.Cell id={this.props.item._id} onClick={this.edit}>
					<Icon name='edit' id={this.props.item._id} onClick={this.edit}/>
				</Table.Cell>
			</Table.Row>
		)
	}
}