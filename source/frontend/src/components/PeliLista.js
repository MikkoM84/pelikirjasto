import React from 'react';
import {Table,Dropdown} from 'semantic-ui-react';
import NormaaliPeliRivi from './NormaaliPeliRivi';
import PoistaPeliRivi from './PoistaPeliRivi';
import MuokkaaPeliRivi from './MuokkaaPeliRivi';
import {connect} from 'react-redux';
import {removeFromList,editItem} from '../actions/listActions';

class PeliLista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			kokoelma:"",
			showKokoelma:false,
			searchStr: ""
		}
	//	this.handleChange = this.handleChange.bind(this);
	}
	
	static getDerivedStateFromProps(props, state) {
    // Re-run the filter whenever the list array or filter text change.
    // Note we need to store prevPropsList and prevFilterText to detect changes.
		if ( props.pelilista !== state.prevPropsList || state.prevFilterText !== state.searchStr ) {
			return {
				prevPropsList: props.pelilista,
				prevFilterText: state.searchStr,
				filteredList: props.pelilista.filter(item => item.nimi.toLowerCase().includes(state.searchStr.toLowerCase()))
			};
		}
		return null;
	}

	handleChange = (e) => {
		this.setState({
			searchStr: e.target.value
		});
	}
	
	remove = (id) => {
		for(let i=0; i<this.state.filteredList.length;i++) {
			if(this.state.filteredList[i]._id === id) {
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
		for(let i=0; i<this.state.filteredList.length;i++) {
			if(this.state.filteredList[i]._id === id) {
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
		this.props.dispatch(removeFromList(id,this.props.token, "/api/pelit/"));
		this.cancel();
	}
	editItem = (item) => {
		this.props.dispatch(editItem(item,this.props.token, "/api/pelit/"));
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1,
			showKokoelma:false
		});
	}
	
	handleSelect = (event,data) => {
		this.setState({kokoelma:data.value});
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
		let listitems = this.state.filteredList.map((item,index) => {
			if(item.kokoelma === this.state.kokoelma) {
				if(this.state.removeIndex === index) {
					return <PoistaPeliRivi item={item}
									key={item._id}
									handleRemove={this.handleRemove}
									cancel={this.cancel}/>
				}
				if(this.state.editIndex === index) {
					return <MuokkaaPeliRivi key={item._id}
									item={item}
									editItem={this.editItem}
									cancel={this.cancel}
									kokoelmalista={this.props.kokoelmalista}
									kategorialista={this.props.kategorialista}/>
				}
				return <NormaaliPeliRivi key={item._id}
							removeFromList={this.remove}
							edit={this.edit}
							showKokoelma={this.state.showKokoelma}
							item={item}/>
			} else {
				return null;
			}
		})
		return(
		<div><Dropdown placeholder="Valitse kokoelma"
							  onChange={this.handleSelect}
							  name="kokoelma"
							  fluid selection 
							  options={kokoelmat}
							  value={this.kokoelma}/>
			<input
            type="text"
			value={this.state.searchStr}
            onChange={this.handleChange}
            placeholder="Etsi"
          />
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

const mapStateToProps = (state) => {
	return {
		pelilista:state.list.pelilista,
		kokoelmalista:state.list.kokoelmalista,
		kategorialista:state.list.kategorialista,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(PeliLista);