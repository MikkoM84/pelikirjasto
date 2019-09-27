import React from 'react';
import {Table,Dropdown} from 'semantic-ui-react';
import NormalRow from './NormalRow';
import DeleteRow from './DeleteRow';
import EditRow from './EditRow';

export default class PeliLista extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			kokoelma:"",
			showKokoelma:false
		}
		
	}
	
	remove = (id) => {
		for(let i=0; i<this.props.pelilista.length;i++) {
			if(this.props.pelilista[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1,
					showKokoelma:false
				});
				return;
			}
		}
	}
	edit = (id) => {
		for(let i=0; i<this.props.pelilista.length;i++) {
			if(this.props.pelilista[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i,
					showKokoelma:true
				});
				return;
			}
		}
	}
	handleRemove = (id) => {
		this.props.removeFromList(id, "/api/pelit/");
		this.cancel();
	}
	editItem = (item) => {
		this.props.editItem(item, "/api/pelit/");
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1,
			showKokoelma:false
		})
	}
	handleSelect = (event,data) => {
		let state = {};
		state[data.name] = data.value;
		this.setState(state);
	}
	
	render() {
		let kokoelmat = [];
		kokoelmat.push({"key":"",
				"text":"Ei kokoelmassa",
				"value":"",});
		for(let i=0;i<this.props.kokoelmalista.length;i++) {
			kokoelmat.push({
				"key":this.props.kokoelmalista[i].kokoelma,
				"text":this.props.kokoelmalista[i].kokoelma,
				"value":this.props.kokoelmalista[i].kokoelma,
			})
		}
		let listitems = this.props.pelilista.map((item,index) => {
			if(item.kokoelma === this.state.kokoelma) {
				if(this.state.removeIndex === index) {
					return <DeleteRow item={item}
									key={item._id}
									handleRemove={this.handleRemove}
									cancel={this.cancel}/>
				}
				if(this.state.editIndex === index) {
					return <EditRow key={item._id}
									item={item}
									editItem={this.editItem}
									cancel={this.cancel}
									kokoelmalista={this.props.kokoelmalista}
									kategorialista={this.props.kategorialista}/>
				}
				return <NormalRow key={item._id}
							removeFromList={this.remove}
							edit={this.edit}
							showKokoelma={this.state.showKokoelma}
							item={item}/>
			} else {
				return <div></div>;
			}
		})
		return(
		<div><Dropdown placeholder="Valitse kokoelma"
							  onChange={this.handleSelect}
							  name="kokoelma"
							  fluid selection 
							  options={kokoelmat}
							  value={this.state.kokoelma}/>
			<Table celled>
				<Table.Header>
					<Table.Row>
						
                { this.state.showKokoelma ? <Table.HeaderCell>Kokoelma</Table.HeaderCell> : null }
						
						<Table.HeaderCell>Pelin nimi</Table.HeaderCell>
						<Table.HeaderCell>Pelin kuvaus</Table.HeaderCell>
						<Table.HeaderCell>Pelin kategoriat</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{listitems}
				</Table.Body>
			</Table></div>
		)
	}
}