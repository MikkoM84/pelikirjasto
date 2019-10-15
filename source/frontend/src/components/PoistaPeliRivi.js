import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class PoistaPeliRivi extends React.Component {
	
	remove = (event) => {
		this.props.handleRemove(event.target.name);
	}
	cancel = (event) => {
		this.props.cancel();
	}
	
	render() {
		let kategoriat;
		if(this.props.item.kategoriat.length > 1 ){
			kategoriat = <Table.Cell>{(this.props.item.kategoriat).reduce((accumulator,item,index) => {return index===0 ? item : accumulator + ", " + String(item)})}</Table.Cell>
		} else {
			kategoriat = <Table.Cell>{this.props.item.kategoriat}</Table.Cell>
		}
		return(
			<Table.Row>
				<Table.Cell>{this.props.item.nimi}</Table.Cell>
				<Table.Cell>{this.props.item.kuvaus}</Table.Cell>
				{kategoriat}
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