import React, {Component} from 'react';
import Panel from 'muicss/lib/react/panel';
import {containsRole} from '../../helpers';

export default class MinionDetails extends Component {

    parseJson(details) {

        let template = [];

        for (let key in details) {
            if (details.hasOwnProperty(key)) {
                template.push(<ul className='mui-list--unstyled' key={key}>
                    <li className='object'>
                        <div className='object__key'>{key}:</div>
                        <div className='object__value'>
                            {Object.prototype.toString.call(details[key]) === '[object Object]' ?
                                this.parseJson(details[key]) :
                                Object.prototype.toString.call(details[key]) === '[object Array]' ?
                                    <ul className='mui-list--unstyled'>
                                        {details[key].map((el, i) => {
                                            return <li key={i}>{el}</li>
                                        })}
                                    </ul> :
                                    details[key]}
                        </div>
                    </li>
                </ul>);
            }
        }

        return template
    }

    render() {

        let details = this.props.details,
            template = this.parseJson(details),
            messages = this.props.messages,
            block = <div>
                <div className='minion-details__actions'>

                    {containsRole(this.props.user.roles, ['ROLE_EXECUTE_SCRIPTS_ON_MINION', 'ROLE_ROOT']) ?
                        <span className='file__actions_remove file__actions_item green' onClick={() => {
                            ::this.props.runScript(this.props.minionName);
                        }} title={messages['client.btn.execute']}><i className='mi mi-play-circle-filled'></i></span>
                        : null}

                    {containsRole(this.props.user.roles, ['ROLE_EDIT_GROUPS_OF_MINION', 'ROLE_ROOT']) ?
                        <span className='minion-details__action' onClick={() => {
                            this.props.getGroups(this.props.minionName);
                        }} title={messages['client.btn.edit.groups']}><i className='mi mi-create'></i></span>
                        : null}

                </div>
                {template}
            </div>;

        if (this.props.error) {
            if (!this.refs['error'].innerHTML) {
                this.refs['error'].innerHTML = this.props.error.message;
            }
        } else {
            if(this.refs['error']) {
                this.refs['error'].innerHTML = '';
            }
        }

        return <Panel className='minion-details'>
            {!this.props.error && !details ? messages['client.message.waiting.answer'] + '...' : null}
            <span className='input_error' ref='error'></span>
            {details ? block : null}
        </Panel>
    }
}