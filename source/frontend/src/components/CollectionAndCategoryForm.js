import React from 'react';
import {Form,Button,Message} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addToList} from '../actions/listActions';

class CollectionAndCategoryForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			collOrCat:"",
			visible: false
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	onSubmit = (event) => {
		event.preventDefault();
		let item = {};
		if(this.props.location.pathname === "/kokoelmat") {
			item = {
				collectionName:this.state.collOrCat
			};
		}
		else {
			item = {
				category:this.state.collOrCat
			};
		}
		this.props.dispatch(addToList(item,this.props.token, "/api" + this.props.location.pathname + "/"));
		this.setState({
			collOrCat:""
		})
		if(this.props.message.length > 0 || this.props.error.length > 0 ) {
			this.setState({visible:true});
			setTimeout(() => {
			  this.setState({ visible: false })
			}, 30000)
		}
	}
	handleDismiss = () => {
		this.setState({ visible: false })
	}
	
	render() {
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
		let name = "";
		if(this.props.location.pathname === "/kokoelmat") {
			name = "Kokoelman nimi";
		}
		else {
			name = "Kategorian nimi"
		}
		return(
			<div>
				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<label htmlFor="collOrCat">{name}:</label>
						<input type="text"
							name="collOrCat"
							placeholder={name}
							style={{textAlign: 'center' }}
							onChange={this.onChange}
							value={this.state.collOrCat}/>
					</Form.Field>
					<Button type="submit" disabled={!this.state.collOrCat}>Lisää</Button>
				</Form>
				{message}
				<br/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token,
		error:state.list.error,
		message:state.list.message
	}
}

export default withRouter(connect(mapStateToProps)(CollectionAndCategoryForm));