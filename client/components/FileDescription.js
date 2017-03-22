import React, {Component} from 'react';
import Panel from 'muicss/lib/react/panel';
import Divider from 'muicss/lib/react/divider';

export default class FileDescription extends Component {

    render() {

        let description = this.props.scriptContent;

        return (
            <Panel className='file'>
                <div className='file__actions'>
                    <span className='file__actions_edit file__actions_item' onClick={() => {
                        this.props.editScript(description.script, description.script.content);
                    }} title='редактировать'><i className='mi mi-edit'></i></span>
                    <span className='file__actions_remove file__actions_item' onClick={() => {
                        this.props.removeScript(description.script);
                    }} title='удалить'><i className='mi mi-delete'></i></span>
                </div>
                <div className='file-name'>{description.script.name}</div>
                <pre className='file-description'>
                    {description.script.content}
                </pre>
                <Divider/>
                <div className='file__footer'>
                    <button className='button mui-btn mui--pull-right' onClick={() => {
                        this.props.runScript(description.script.name);
                    }}>Запустить</button>
                </div>
            </Panel>
        );
    }
}