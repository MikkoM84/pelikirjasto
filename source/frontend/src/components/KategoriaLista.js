import React from 'react';
import {Table} from 'semantic-ui-react';
import NormaaliKategoriaRivi from './NormaaliKategoriaRivi';
import PoistaKategoriaRivi from './PoistaKategoriaRivi';
import MuokkaaKategoriaRivi from './MuokkaaKategoriaRivi';
import {connect} from 'react-redux';
import {removeFromList,editItem,getList} from '../actions/listActions';

class KategoriaLista extends React.Component {
	
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
		this.props.dispatch(removeFromList(id,this.props.token, "/api/kategoriat/")).then(
		this.props.dispatch(getList(this.props.token, "/api/pelit/")));
//		this.props.removeFromList(id, "/api/kategoriat/");
		this.cancel();
	}
	editItem = (item, index) => {
		this.props.dispatch(editItem(item,this.props.token, "/api/kategoriat/")).then(
		this.props.dispatch(getList(this.props.token, "/api/pelit/")));
//		this.props.editItem(item, "/api/kategoriat/");
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
				return <PoistaKategoriaRivi item={item}
								key={item._id}
								handleRemove={this.handleRemove}
								cancel={this.cancel}/>
			}
			if(this.state.editIndex === index) {
				return <MuokkaaKategoriaRivi key={item._id}
								item={item}
								editItem={this.editItem}
								cancel={this.cancel}/>
			}
			return <NormaaliKategoriaRivi key={item._id}
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

const mapStateToProps = (state) => {
	return {
		pelilista:state.list.pelilista,
		kategorialista:state.list.kategorialista,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(KategoriaLista);