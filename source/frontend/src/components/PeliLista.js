import React from 'react';
import {Table,Dropdown,Input,Message,Pagination} from 'semantic-ui-react';
import NormaaliPeliRivi from './NormaaliPeliRivi';
import PoistaPeliRivi from './PoistaPeliRivi';
import MuokkaaPeliRivi from './MuokkaaPeliRivi';
import {connect} from 'react-redux';
import {removeFromList,editItem,setPelikokoelma,setSivulla} from '../actions/listActions';

class PeliLista extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			kokoelma:this.props.pelikokoelma,
			showKokoelma:false,
			searchStr: "",
			visible: false,
			page:1,
			sivulla:this.props.sivulla ? this.props.sivulla : 10
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
				.sort((a, b) => a.nimi.localeCompare(b.nimi))
			};
		}
		return null;
	}

	handleChange = (e) => {
		this.setState({
			searchStr: e.target.value,
			page:1
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
		if(this.props.message.length > 0 || this.props.error.length > 0 ) {
			this.setState({visible:true});
			setTimeout(() => {
			  this.setState({ visible: false })
			}, 3000)
		}
	}
	handleDismiss = () => {
		this.setState({ visible: false })
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
		this.props.dispatch(setPelikokoelma(data.value));
	}
	
	
	setPageNum = (event, { activePage }) => {
		this.setState({ page: Math.ceil(activePage) });
	};
	
	handleInputChange = (e, { name, value }) => {
		this.setState({ [name]: value });
		this.props.dispatch(setSivulla(value));
	}
	
	render() {
		let message = null;
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
		if(this.props.message.length > 0) {
			  message = <Message
				success
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				onClick={this.handleDismiss}
				header={this.props.message}
			  />;
		}
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
		kokoelmat.sort((a, b) => a.value.localeCompare(b.value));
		let listitems = this.state.filteredList.map((item,index) => {
			if(item.kokoelma === this.state.kokoelma ) {
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
		});
		
		const page = this.state.page;
		listitems = listitems.filter((el) => el != null);
		const items = listitems.slice(
		  (page - 1) * this.state.sivulla,
		  (page - 1) * this.state.sivulla + this.state.sivulla
		);
		const totalPages = listitems.length / this.state.sivulla;
		const opt = [{ text: 10, value: 10 },{ text: 20, value: 20 },{ text: 50, value: 50 },
			{ text: 100, value: 100 },{ text: 500, value: 500 },{ text: 1000, value: 1000 },];

		return(
			<div>
				<div>
					<Dropdown placeholder="Valitse kokoelma"
						onChange={this.handleSelect}
						name="kokoelma"
						selection 
						options={kokoelmat}
						value={this.state.kokoelma}
					/>
					<Input
						type="text"
						value={this.state.searchStr}
						onChange={this.handleChange}
						placeholder="Etsi"
					/>
				</div>
				<Table celled compact="very">
					<Table.Header>
						<Table.Row>
						
							{ this.state.showKokoelma ? <Table.HeaderCell>Kokoelma</Table.HeaderCell> : null }
						
							<Table.HeaderCell>Pelin nimi</Table.HeaderCell>
							<Table.HeaderCell>Pelin kuvaus</Table.HeaderCell>
							<Table.HeaderCell>Pelin kategoriat</Table.HeaderCell>
							<Table.HeaderCell>Poista</Table.HeaderCell>
							<Table.HeaderCell>Muokkaa</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{items}
					</Table.Body>
				</Table>
				<Pagination 
						activePage={page}
						totalPages={totalPages}
						boundaryRange={2}
						siblingRange={1}
						onPageChange={this.setPageNum} />
				<Dropdown
					name='sivulla'
					selection
					options={opt}
					onChange={this.handleInputChange}
					type='number'
					defaultValue={this.state.sivulla}
					style={{ minWidth: 'auto'}}
				/><span> peliä sivulla</span>
				{message}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		pelilista:state.list.pelilista,
		kokoelmalista:state.list.kokoelmalista,
		kategorialista:state.list.kategorialista,
		token:state.login.token,
		error:state.list.error,
		message:state.list.message,
		pelikokoelma:state.list.pelikokoelma,
		sivulla:state.list.sivulla
	}
}

export default connect(mapStateToProps)(PeliLista);