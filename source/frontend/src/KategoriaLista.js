import React from 'react';
import {Table} from 'semantic-ui-react';
import KategoriaRow from './KategoriaRow';
import DeleteKategoriaRow from './DeleteKategoriaRow';
import EditKategoriaRow from './EditKategoriaRow';

export default class KategoriaLista extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	remove = (id) => {
		for(let i=0; i<this.props.kategorialista.length;i++) {
			if(this.props.kategorialista[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				});
				return;
			}
		}
	}
	edit = (id) => {
//				console.log("kl: ");
//				console.log(this.props.kategorialista);
		for(let i=0; i<this.props.kategorialista.length;i++) {
			if(this.props.kategorialista[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				});
				return;
			}
		}
	}
	handleRemove = (id) => {
		this.props.removeFromList(id, "/api/kategoriat/");
		this.cancel();
	}
	editItem = (item) => {
		this.props.editItem(item, "/api/kategoriat/");
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	render() {
		let listitems = this.props.kategorialista.map((item,index) => {
			if(this.state.removeIndex === index) {
				return <DeleteKategoriaRow item={item}
								key={item._id}
								handleRemove={this.handleRemove}
								cancel={this.cancel}/>
			}
			if(this.state.editIndex === index) {
				return <EditKategoriaRow key={item._id}
								item={item}
								editItem={this.editItem}
								cancel={this.cancel}/>
			}
			return <KategoriaRow key={item._id}
						removeFromList={this.remove}
						edit={this.edit}
						item={item}/>
			
		})
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						
						<Table.HeaderCell>Kategorian nimi</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{listitems}
				</Table.Body>
			</Table>
		)
	}
}