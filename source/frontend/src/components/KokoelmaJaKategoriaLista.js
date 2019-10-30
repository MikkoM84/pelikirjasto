import React from 'react';
import {Table,Message} from 'semantic-ui-react';
import NormaaliKokoelmaJaKategoriaRivi from './NormaaliKokoelmaJaKategoriaRivi';
import PoistaKokoelmaJaKategoriaRivi from './PoistaKokoelmaJaKategoriaRivi';
import MuokkaaKokoelmaJaKategoriaRivi from './MuokkaaKokoelmaJaKategoriaRivi';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {removeFromList,editItem} from '../actions/listActions';

class KokoelmaJaKategoriaLista extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			visible: false
		}
	}
	
	remove = (id) => {
		for(let i=0; i<(this.props.location.pathname === "/kokoelmat" ? this.props.kokoelmalista : this.props.kategorialista).length;i++) {
			if((this.props.location.pathname === "/kokoelmat" ? this.props.kokoelmalista : this.props.kategorialista)[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				});
				return;
			}
		}
	}
	edit = (id) => {
		for(let i=0; i<(this.props.location.pathname === "/kokoelmat" ? this.props.kokoelmalista : this.props.kategorialista).length;i++) {
			if((this.props.location.pathname === "/kokoelmat" ? this.props.kokoelmalista : this.props.kategorialista)[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				});
				return;
			}
		}
	}
	handleRemove = (id) => {
		this.props.dispatch(removeFromList(id,this.props.token, "/api" + this.props.location.pathname + "/"));
		this.cancel();
	}
	editItem = (item) => {
		this.props.dispatch(editItem(item,this.props.token, "/api" + this.props.location.pathname + "/"));
		this.cancel();
		if(this.props.message.length > 0 || this.props.error.length > 0 ) {
			this.setState({visible:true});
			setTimeout(() => {
			  this.setState({ visible: false })
			}, 3000)
		}
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	handleDismiss = () => {
		this.setState({ visible: false })
	}
	
	render() {
		let listitems = [...(this.props.location.pathname === "/kokoelmat" ? this.props.kokoelmalista : this.props.kategorialista)]
		.map((item,index) => {
			if(this.state.removeIndex === index) {
				return <PoistaKokoelmaJaKategoriaRivi item={item}
							key={item._id}
							handleRemove={this.handleRemove}
							cancel={this.cancel}
							url={this.props.location.pathname}/>
			}
			if(this.state.editIndex === index) {
				return <MuokkaaKokoelmaJaKategoriaRivi key={item._id}
							item={item}
							editItem={this.editItem}
							cancel={this.cancel}
							url={this.props.location.pathname}/>
			}
			return <NormaaliKokoelmaJaKategoriaRivi key={item._id}
						removeFromList={this.remove}
						edit={this.edit}
						item={item}
						url={this.props.location.pathname}/>
			
		})
		let message = null;
		if(this.props.message.length > 0) {
			message = <Message
				success
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				onClick={this.handleDismiss}
				header={this.props.message}
			/>;
		}
		if(this.props.error.length > 0) {
			message = <Message
				error
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				onClick={this.handleDismiss}
				header='Virhe'
				content={this.props.error}
			/>;
		}
		let nimi = "";
		if(this.props.location.pathname === "/kokoelmat") {
			nimi = "Kokoelman nimi";
		}
		else {
			nimi = "Kategorian nimi";
		}
		return(
			<div>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>{nimi}</Table.HeaderCell>
							<Table.HeaderCell>Poista</Table.HeaderCell>
							<Table.HeaderCell>Muokkaa</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{listitems}
					</Table.Body>
				</Table>
				{message}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		kategorialista:[...state.list.kategorialista].sort((a, b) => a.kategoria.localeCompare(b.kategoria)),
		kokoelmalista:[...state.list.kokoelmalista].sort((a, b) => a.kokoelma.localeCompare(b.kokoelma)),
		token:state.login.token,
		error:state.list.error,
		message:state.list.message
	}
}

export default withRouter(connect(mapStateToProps)(KokoelmaJaKategoriaLista));