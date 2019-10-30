import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class PoistaKokoelmaJaKategoriaRivi extends React.Component {
	
	remove = (event) => {
		this.props.handleRemove(event.target.id);
	}
	cancel = (event) => {
		this.props.cancel();
	}
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>{this.props.url === "/kokoelmat" ? this.props.item.kokoelma : this.props.item.kategoria}</Table.Cell>
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