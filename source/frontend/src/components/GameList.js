import React from 'react';
import {Table,Dropdown,Input,Message,Pagination,Grid} from 'semantic-ui-react';
import NormalGameRow from './NormalGameRow';
import DeleteGameRow from './DeleteGameRow';
import EditGameRow from './EditGameRow';
import {connect} from 'react-redux';
import {removeFromList,editItem,setGameCollection,setGamesPerPage} from '../actions/listActions';

class GameList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			collectionName:this.props.gameCollection,
			category:[],
			showCollection:false,
			searchStr: "",
			visible: false,
			page:1,
			gamesPerPage:this.props.gamesPerPage ? this.props.gamesPerPage : 10
		}
	
	}
	
	static getDerivedStateFromProps(props, state) {
    // Filtteri ajetaan uudestaan aina kun pelilista, filtteri teksti tai valitut categoryt muuttuvat.
		if ( props.gameList !== state.prevPropsList || state.prevFilterText !== state.searchStr || 
			state.prevFilterSelection !== state.category ) {
			return {
				prevPropsList: props.gameList,
				prevFilterText: state.searchStr,
				prevFilterSelection: state.category,
				filteredList: props.gameList.filter(item => state.category.every(r => item.categories.includes(r)) && 
				item.game.toLowerCase().includes(state.searchStr.toLowerCase()))
				.sort((a, b) => a.game.localeCompare(b.game))
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
					showCollection:false
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
					showCollection:true
				});
				return;
			}
		}
	}
	handleRemove = (id) => {
		this.props.dispatch(removeFromList(id,this.props.token, "/api/pelit/"));
		this.cancel();
		if(this.props.message.length > 0 || this.props.error.length > 0 ) {
			this.setState({visible:true});
		}
	}
	editItem = (item) => {
		this.props.dispatch(editItem(item,this.props.token, "/api/pelit/"));
		this.cancel();
		if(this.props.message.length > 0 || this.props.error.length > 0 ) {
			this.setState({visible:true});
		}
	}
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1,
			showCollection:false
		});
	}
	handleDismiss = () => {
		this.setState({ visible: false })
	}
	handleSelect = (event,data) => {
		this.setState({collectionName:data.value});
		this.props.dispatch(setGameCollection(data.value));
	}
	handleMultiSelect = (event,data) => {
		this.setState({category:data.value});
	}
	setPageNum = (event, { activePage }) => {
		this.setState({ page: Math.ceil(activePage) });
	};
	handleInputChange = (e, { name, value }) => {
		this.setState({ [name]: value });
		this.props.dispatch(setGamesPerPage(value));
	}
	
	render() {
		let message = null;
/*		if(this.props.message.length > 0) {
			  message = <Message
				success
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				onClick={this.handleDismiss}
				header={this.props.message}
			  />;
		}
*/		if(this.props.error.length > 0) {
			message = <Message
				error
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				onClick={this.handleDismiss}
				header='Virhe'
				content={this.props.error}
			  />;
		}
		let categories = [];
		for(let i=0;i<this.props.categoryList.length;i++) {
			categories.push({
				"key":this.props.categoryList[i].category,
				"text":this.props.categoryList[i].category,
				"value":this.props.categoryList[i].category,
			})
		}
		let collections = [];
		collections.push({"key":"",
				"text":"Ei kokoelmassa",
				"value":"",});
		for(let i=0;i<this.props.collectionList.length;i++) {
			collections.push({
				"key":this.props.collectionList[i].collectionName,
				"text":this.props.collectionList[i].collectionName,
				"value":this.props.collectionList[i].collectionName,
			})
		}
		let listitems = this.state.filteredList.map((item,index) => {
			if(item.collectionName === this.state.collectionName ) {
				if(this.state.removeIndex === index) {
					return <DeleteGameRow item={item}
									key={item._id}
									handleRemove={this.handleRemove}
									cancel={this.cancel}/>
				}
				if(this.state.editIndex === index) {
					return <EditGameRow key={item._id}
									item={item}
									editItem={this.editItem}
									cancel={this.cancel}
									collectionList={collections}
									categoryList={categories}/>
				}
				return <NormalGameRow key={item._id}
							removeFromList={this.remove}
							edit={this.edit}
							showCollection={this.state.showCollection}
							item={item}/>
			} else {
				return null;
			}
		});
		
		const page = this.state.page;
		listitems = listitems.filter((el) => el != null);
		const totalPages = listitems.length / this.state.gamesPerPage;
		listitems = listitems.slice(
			(page - 1) * this.state.gamesPerPage,
			(page - 1) * this.state.gamesPerPage + this.state.gamesPerPage
		);
		const opt = [{ text: 10, value: 10 },{ text: 20, value: 20 },{ text: 50, value: 50 },
			{ text: 100, value: 100 },{ text: 500, value: 500 },{ text: 1000, value: 1000 },];

		return(
			<div>
				<Grid columns={1}>
					<Grid.Column>
					<Dropdown placeholder="Valitse kokoelma"
						onChange={this.handleSelect}
						name="collectionName"
						selection
						options={collections}
						value={this.state.collectionName}
					/>
					<Input
						type="text"
						value={this.state.searchStr}
						onChange={this.handleChange}
						placeholder="Etsi"
					/>
					<Dropdown placeholder="kategoriafiltteri"
						onChange={this.handleMultiSelect}
						name="category"
						multiple selection search
						options={categories}
						value={this.state.category}
					/>
					</Grid.Column>
				</Grid>
				<Table celled compact="very">
					<Table.Header>
						<Table.Row>
						
							{ this.state.showCollection ? <Table.HeaderCell>Kokoelma</Table.HeaderCell> : null }
						
							<Table.HeaderCell>Pelin nimi</Table.HeaderCell>
							<Table.HeaderCell>Pelin kuvaus</Table.HeaderCell>
							<Table.HeaderCell>Pelin kategoriat</Table.HeaderCell>
							<Table.HeaderCell>Poista</Table.HeaderCell>
							<Table.HeaderCell>Muokkaa</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{listitems}
					</Table.Body>
				</Table>
				<Pagination 
						activePage={page}
						totalPages={totalPages}
						boundaryRange={2}
						siblingRange={1}
						onPageChange={this.setPageNum} />
				<Dropdown
					name='gamesPerPage'
					selection
					options={opt}
					onChange={this.handleInputChange}
					type='number'
					defaultValue={this.state.gamesPerPage}
					style={{ minWidth: 'auto'}}
				/><span> peliä sivulla</span>
				{message}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		gameList:state.list.gameList,
		collectionList:state.list.collectionList.sort((a, b) => a.collectionName.localeCompare(b.collectionName)),
		categoryList:state.list.categoryList.sort((a, b) => a.category.localeCompare(b.category)),
		token:state.login.token,
		error:state.list.error,
		message:state.list.message,
		gameCollection:state.list.gameCollection,
		gamesPerPage:state.list.gamesPerPage
	}
}

export default connect(mapStateToProps)(GameList);