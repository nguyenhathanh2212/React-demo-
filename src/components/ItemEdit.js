import React, {Component} from 'react';
import {map as mapld} from 'lodash';

class ItemEdit extends Component {
    renderLevel = () => {
        let {arrayLevel} = this.props;

        return mapld(arrayLevel, (level, index) => {
            switch (level) {
                case 0:
                    return <option key={index} value={level}>Small</option>
                case 1:
                    return <option key={index} value={level}>Medium</option>
                default:
                    return <option key={index} value={level}>High</option>
            }
        });
    }

    render() {
        return (
            <tr>
                <td className="text-center">{this.props.indexEdit}</td>
                <td><input type="text" className="form-control" defaultValue={this.props.nameEdit} /></td>
                <td className="text-center">
                    <select className="form-control" selectedIndex={this.props.levelEdit}>
                        {this.renderLevel()}
                    </select>
                </td>
                <td>
                    <button type="button" className="btn btn-default btn-sm">Cancel</button>
                    <button type="button" className="btn btn-success btn-sm">Save</button>
                </td>
            </tr>
        );
    }
}

export default ItemEdit;
