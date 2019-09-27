import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class NormalRow extends React.Component {
	
	state = { checked: false }
	toggle = () => this.setState(prevState => ({ checked: !prevState.checked }))
	
	remove = (event) => {
		this.props.removeFromList(event.target.name);
	}
	
	edit = (event) => {
		this.props.edit(event.target.id);
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
				{ this.props.showKokoelma ? <Table.Cell></Table.Cell> : null }
				<Table.Cell>{this.props.item.nimi}</Table.Cell>
				<Table.Cell>{this.props.item.kuvaus}</Table.Cell>
				{kategoriat}
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