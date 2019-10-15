import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addToList} from '../actions/listActions';

class KokoelmatForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			kokoelma:""
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			kokoelma:this.state.kokoelma
		};
		this.props.dispatch(addToList(item,this.props.token, "/api/kokoelmat/"));
		this.setState({
			kokoelma:""
		})
	}
	
	render() {
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="kokoelma">Kokoelman nimi:</label>
					<input type="text"
							name="kokoelma"
							onChange={this.onChange}
							value={this.state.kokoelma}/>
				</Form.Field>
				<Button type="submit" disabled={!this.state.kokoelma}>Lisää</Button>
			</Form>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token
	}
}
//withrouter tarpeellinen?
export default withRouter(connect(mapStateToProps)(KokoelmatForm));