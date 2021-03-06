import React, {Component} from 'react';
import Input from 'muicss/lib/react/input';
import Divider from 'muicss/lib/react/divider';
import Button from 'muicss/lib/react/button';

export default class EditMinionsGroupModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupName: props.group.name || '',
            groupExist: false
        }
    }

    addGroupName(name) {
        this.setState({
            groupName: name,
            groupExist: false
        });
    }

    checkGroupName(name) {
        this.props.groups.map(group => {
            if(group.group === name && group.group != this.props.group.name) {
                this.setState({groupExist: true});
            }
        })
    }

    editGroup() {
        this.props.edit(this.props.group.id, this.state.groupName);
    }

    render() {

        let messages = this.props.messages;

        return <div className='modal__content'>
            <div className='modal__close_btn' onClick={this.props.closeModal}>X</div>
            <div className='modal__header mui--text-center'>
                {messages['client.modal.group.editing']}
            </div>
            <Input label={messages['client.input.group.name']} floatingLabel={true} onChange={(e) => {
                this.addGroupName(e.target.value);
                this.checkGroupName(e.target.value);
            }} defaultValue={this.state.groupName}/>
            {this.state.groupExist ? <span className='input_error'>{messages['client.error.group.exists']}</span> : null}
            <div className='modal__footer'>
                <Divider/>
                <Button size='small' color='primary' variant='flat' className='modal__btn mui--pull-right'
                        onClick={::this.editGroup} disabled={this.state.groupName === '' || this.state.groupExist}>{messages['client.btn.save']}</Button>
            </div>
        </div>
    }
}