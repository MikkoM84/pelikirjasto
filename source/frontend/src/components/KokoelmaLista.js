import React from 'react';
import {Table} from 'semantic-ui-react';
import NormaaliKokoelmaRivi from './NormaaliKokoelmaRivi';
import PoistaKokoelmaRivi from './PoistaKokoelmaRivi';
import MuokkaaKokoelmaRivi from './MuokkaaKokoelmaRivi';
import {connect} from 'react-redux';
import {removeFromList,editItem,getList} from '../actions/listActions';

class KokoelmaLista extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1
		}
	}
	
	remove = (id) => {
		for(let i=0; i<this.props.kokoelmalista.length;i++) {
			if(this.props.kokoelmalista[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				});
				return;
			}
		}
	}
	edit = (id) => {
				console.log("kkl: ");
				console.log(this.props.kokoelmalista);
		for(let i=0; i<this.props.kokoelmalista.length;i++) {
			if(this.props.kokoelmalista[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				});
				return;
			}
		}
	}
	handleRemove = (id) => {
		this.props.dispatch(removeFromList(id,this.props.token, "/api/kokoelmat/")).then(
		this.props.dispatch(getList(this.props.token, "/api/pelit/")));
//		this.props.removeFromList(id, "/api/kokoelmat/");
		this.cancel();
	}
	editItem = (item) => {
		this.props.dispatch(editItem(item,this.props.token, "/api/kokoelmat/")).then(
		this.props.dispatch(getList(this.props.token, "/api/pelit/")));
//		this.props.editItem(item, "/api/kokoelmat/");
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	render() {
		let listitems = this.props.kokoelmalista.map((item,index) => {
			if(this.state.removeIndex === index) {
				return <PoistaKokoelmaRivi item={item}
								key={item._id}
								handleRemove={this.handleRemove}
								cancel={this.cancel}/>
			}
			if(this.state.editIndex === index) {
				return <MuokkaaKokoelmaRivi key={item._id}
								item={item}
								editItem={this.editItem}
								cancel={this.cancel}/>
			}
			return <NormaaliKokoelmaRivi key={item._id}
						removeFromList={this.remove}
						edit={this.edit}
						item={item}/>
			
		})
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						
						<Table.HeaderCell>Kokoelman nimi</Table.HeaderCell>
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
		kokoelmalista:state.list.kokoelmalista,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(KokoelmaLista);