import React from 'react';
import {Form,Button,Dropdown,Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addToList} from '../actions/listActions';
		
class AddGameForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			collectionName:"",
			game:"",
			description:"",
			categories:[],
			visible: false
		}
	}
	
	handleSelect = (event,data) => {
		let state = {};
		state[data.name] = data.value;
		this.setState(state);
	}

	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	onSubmit = (event) => {
		event.preventDefault();
		if(this.state.collectionName === "") {
			return alert("Valitse kokoelma");
		}
		let item = {
			collectionName:this.state.collectionName,
			game:this.state.game,
			description:this.state.description,
			categories:this.state.categories
		};
		this.props.dispatch(addToList(item,this.props.token, "/api/pelit/"));
		this.setState({
			
			game:"",
			description:"",
			categories:[]
		})
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
	
	render() {
		let collections = [];
		for(let i=0;i<this.props.collectionList.length;i++) {
			collections.push({
				"key":this.props.collectionList[i].collectionName,
				"text":this.props.collectionList[i].collectionName,
				"value":this.props.collectionList[i].collectionName,
			})
		}
		collections.sort((a, b) => a.value.localeCompare(b.value));
		let category = [];
		for(let i=0;i<this.props.categoryList.length;i++) {
			category.push({
				"key":this.props.categoryList[i].category,
				"text":this.props.categoryList[i].category,
				"value":this.props.categoryList[i].category,
			})
		}
		category.sort((a, b) => a.value.localeCompare(b.value));
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
		
		return(
		<div>
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="kokoelma">Kokoelma: <span style={{color: 'red'}}>*</span></label>
					<Dropdown placeholder="Valitse kokoelma"
							required
							onChange={this.handleSelect}
							name="collectionName"
							fluid selection 
							style={{textAlignLast: 'center' }}
							options={collections}
							value={this.state.collectionName}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="nimi">Pelin nimi: <span style={{color: 'red'}}>*</span></label>
					<input type="text"
							name="game"
							placeholder="Pelin nimi"
							required
							style={{textAlign: 'center' }}
							onChange={this.onChange}
							value={this.state.game}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="kuvaus">Pelin kuvaus:</label>
					<input type="text"
							name="description"
							placeholder="Pelin kuvaus"
							style={{textAlign: 'center' }}
							onChange={this.onChange}
							value={this.state.description}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="kategoriat">Kategoriat:</label>
					<Dropdown placeholder="Valitse kategoriat"
							  onChange={this.handleSelect}
							  name="categories"
							  fluid selection multiple
							style={{textAlignLast: 'center' }}
							  options={category}
							  value={this.state.categories}/>
				</Form.Field>
				
				<Button type="submit" disabled={!this.state.game || !this.state.collectionName}>Lisää</Button>
			</Form>
			{message}
		</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		gameList:state.list.gameList,
		collectionList:state.list.collectionList,
		categoryList:state.list.categoryList,
		token:state.login.token,
		error:state.list.error,
		message:state.list.message,
	}
}

export default withRouter(connect(mapStateToProps)(AddGameForm));