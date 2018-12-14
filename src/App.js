import React, { Component } from 'react';
import Title from './components/Title';
import Search from './components/Search';
import Sort from './components/Sort';
import Form from './components/Form';
import Item from './components/Item';
import ItemEdit from './components/ItemEdit';
import Items from './mockdata/Items';
import SweetAlert from 'sweetalert-react';
import './../node_modules/sweetalert/dist/sweetalert.css';
import { map as mapld, remove as removeld } from 'lodash';

let listItems = Items;
let arrayLevel = [];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: listItems,
            showAlert: false,
            titleAlert: '',
            idItem: '',
            indexEdit: 0,
            idEdit: '',
            nameEdit: '',
            levelEdit: 0,
            arrayLevel: [0, 1, 2],
        }
    }
    handleShowAlert = (item) => {
        this.setState({
            titleAlert: item.name,
            showAlert: true,
            idItem: item.id,
        });
    }
    handleDeleteItem = () => {
        let {idItem, items} = this.state;
        removeld(items, (item) => {
            return item.id === idItem;
        });
        this.setState({
            showAlert: false
        });
    }
    handleShowEditItem = (index, item) => {
        this.setState({
            indexEdit: index,
            idEdit: item.id,
            nameEdit: item.name,
            levelEdit: item.level
        });
    }
    renderItem = () => {
        let {items, idEdit} = this.state;

        if(items.length === 0) {
            return <Item item={0} />
        }

        return mapld(items,(item,index) => {
            if (item.id == idEdit) {
                return (
                    <ItemEdit
                        key={index}
                        indexEdit={this.state.indexEdit}
                        nameEdit={this.state.nameEdit}
                        levelEdit={this.state.levelEdit}
                        arrayLevel={this.state.arrayLevel}
                    />
                )
            }

            return (
                <Item
                    key={index}
                    index={index+1}
                    item={item}
                    handleShowAlert={this.handleShowAlert}
                    handleShowEditItem={this.handleShowEditItem}
                />
            )
        });
    }
    render() {
        return (
            <div className="container">
                <SweetAlert
                    show={this.state.showAlert}
                    title="Delete Item"
                    text={this.state.titleAlert}
                    showCancelButton
                    onOutsideClick={() => this.setState({ showAlert: false })}
                    onEscapeKey={() => this.setState({ showAlert: false })}
                    onCancel={() => this.setState({ showAlert: false })}
                    onConfirm={() => this.handleDeleteItem()}
                />
                <Title />
                <div className="row">
                    <Search />
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <Sort />
                    </div>
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <button type="button" className="btn btn-info btn-block marginB10">Add Item</button>
                    </div>
                </div>
                <div className="row marginB10">
                    <div className="col-md-offset-7 col-md-5">
                        <Form />
                    </div>
                </div>
                <div className="panel panel-success">
                    <div className="panel-heading">List Item</div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }} className="text-center">#</th>
                                <th>Name</th>
                                <th style={{ width: '15%' }} className="text-center">Level</th>
                                <th style={{ width: '15%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderItem() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
