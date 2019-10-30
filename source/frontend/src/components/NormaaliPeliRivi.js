import React from 'react';
import {Table,Icon} from 'semantic-ui-react';

export default class NormaaliPeliRivi extends React.Component {
	
	remove = (event) => {
		this.props.removeFromList(event.target.id);
	}
	
	edit = (event) => {
		this.props.edit(event.target.id);
	}
	
	render() {
		let kategoriat;
		if(this.props.item.kategoriat.length > 1 ){
			kategoriat = <Table.Cell>{([...this.props.item.kategoriat]).sort()
			.reduce((accumulator,item,index) => {return index===0 ? item : accumulator + ", " + String(item)})}</Table.Cell>
		} else {
			kategoriat = <Table.Cell>{this.props.item.kategoriat}</Table.Cell>
		}
		return(
				
			<Table.Row>
				{ this.props.showKokoelma ? <Table.Cell></Table.Cell> : null }
				<Table.Cell>{this.props.item.nimi}</Table.Cell>
				<Table.Cell>{this.props.item.kuvaus}</Table.Cell>
				{kategoriat}
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