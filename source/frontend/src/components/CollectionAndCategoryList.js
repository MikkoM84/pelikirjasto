import React from 'react';
import {Table,Message} from 'semantic-ui-react';
import NormalCollectionAndCategoryRow from './NormalCollectionAndCategoryRow';
import DeleteCollectionAndCategoryRow from './DeleteCollectionAndCategoryRow';
import EditCollectionAndCategoryRow from './EditCollectionAndCategoryRow';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {removeFromList,editItem} from '../actions/listActions';

class CollectionAndCategoryList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			visible: false
		}
	}
	
	remove = (id) => {
		for(let i=0; i<(this.props.location.pathname === "/kokoelmat" ? this.props.collectionList : this.props.categoryList).length;i++) {
			if((this.props.location.pathname === "/kokoelmat" ? this.props.collectionList : this.props.categoryList)[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				});
				return;
			}
		}
	}
	edit = (id) => {
		for(let i=0; i<(this.props.location.pathname === "/kokoelmat" ? this.props.collectionList : this.props.categoryList).length;i++) {
			if((this.props.location.pathname === "/kokoelmat" ? this.props.collectionList : this.props.categoryList)[i]._id === id) {
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
		let listitems = [...(this.props.location.pathname === "/kokoelmat" ? this.props.collectionList : this.props.categoryList)]
		.map((item,index) => {
			if(this.state.removeIndex === index) {
				return <DeleteCollectionAndCategoryRow item={item}
							key={item._id}
							handleRemove={this.handleRemove}
							cancel={this.cancel}
							url={this.props.location.pathname}/>
			}
			if(this.state.editIndex === index) {
				return <EditCollectionAndCategoryRow key={item._id}
							item={item}
							editItem={this.editItem}
							cancel={this.cancel}
							url={this.props.location.pathname}/>
			}
			return <NormalCollectionAndCategoryRow key={item._id}
						removeFromList={this.remove}
						edit={this.edit}
						item={item}
						url={this.props.location.pathname}/>
			
		})
		let message = null;
	/*	if(this.props.message.length > 0) {
			message = <Message
				success
				hidden={!this.state.visible}
				onDismiss={this.handleDismiss}
				onClick={this.handleDismiss}
				header={this.props.message}
			/>;
		}
	*/	if(this.props.error.length > 0) {
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
			name = "Kategorian nimi";
		}
		return(
			<div>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>{name}</Table.HeaderCell>
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
		categoryList:[...state.list.categoryList].sort((a, b) => a.category.localeCompare(b.category)),
		collectionList:[...state.list.collectionList].sort((a, b) => a.collectionName.localeCompare(b.collectionName)),
		token:state.login.token,
		error:state.list.error,
		message:state.list.message
	}
}

export default withRouter(connect(mapStateToProps)(CollectionAndCategoryList));