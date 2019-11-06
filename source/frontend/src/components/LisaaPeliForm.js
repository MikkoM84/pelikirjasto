import React from 'react';
import {Form,Button,Dropdown,Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addToList} from '../actions/listActions';
		
class LisaaPeliForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			kokoelma:"",
			nimi:"",
			kuvaus:"",
			kategoriat:[],
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
		if(this.state.kokoelma === "") {
			return alert("Valitse kokoelma");
		}
		let item = {
			kokoelma:this.state.kokoelma,
			nimi:this.state.nimi,
			kuvaus:this.state.kuvaus,
			kategoriat:this.state.kategoriat
		};
		this.props.dispatch(addToList(item,this.props.token, "/api/pelit/"));
		this.setState({
			
			nimi:"",
			kuvaus:"",
			kategoriat:[]
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
		let kokoelmat = [];
		for(let i=0;i<this.props.kokoelmalista.length;i++) {
			kokoelmat.push({
				"key":this.props.kokoelmalista[i].kokoelma,
				"text":this.props.kokoelmalista[i].kokoelma,
				"value":this.props.kokoelmalista[i].kokoelma,
			})
		}
		kokoelmat.sort((a, b) => a.value.localeCompare(b.value));
		let kat = [];
		for(let i=0;i<this.props.kategorialista.length;i++) {
			kat.push({
				"key":this.props.kategorialista[i].kategoria,
				"text":this.props.kategorialista[i].kategoria,
				"value":this.props.kategorialista[i].kategoria,
			})
		}
		kat.sort((a, b) => a.value.localeCompare(b.value));
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
							name="kokoelma"
							fluid selection 
							style={{textAlignLast: 'center' }}
							options={kokoelmat}
							value={this.state.kokoelma}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="nimi">Pelin nimi: <span style={{color: 'red'}}>*</span></label>
					<input type="text"
							name="nimi"
							placeholder="Pelin nimi"
							required
							style={{textAlign: 'center' }}
							onChange={this.onChange}
							value={this.state.nimi}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="kuvaus">Pelin kuvaus:</label>
					<input type="text"
							name="kuvaus"
							placeholder="Pelin kuvaus"
							style={{textAlign: 'center' }}
							onChange={this.onChange}
							value={this.state.kuvaus}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="kategoriat">Kategoriat:</label>
					<Dropdown placeholder="Valitse kategoriat"
							  onChange={this.handleSelect}
							  name="kategoriat"
							  fluid selection multiple
							style={{textAlignLast: 'center' }}
							  options={kat}
							  value={this.state.kategoriat}/>
				</Form.Field>
				
				<Button type="submit" disabled={!this.state.nimi || !this.state.kokoelma}>Lisää</Button>
			</Form>
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
	}
}

export default withRouter(connect(mapStateToProps)(LisaaPeliForm));