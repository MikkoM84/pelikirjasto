import React from 'react';
import {Form,Button} from 'semantic-ui-react';

export default class KategoriatForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			kategoria:""
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
			kategoria:this.state.kategoria
		};
		this.props.addToList(item, "/api/kategoriat/");
		console.log(item);
		this.setState({
			kategoria:""
		})
	}
	
	render() {
		return(
			<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="kokoelma">Kategorian nimi:</label>
					<input type="text"
							name="kategoria"
							onChange={this.onChange}
							value={this.state.kategoria}/>
				</Form.Field>
				<Button type="submit" disabled={!this.state.kategoria}>Lisää</Button>
			</Form>
		)
	}
}