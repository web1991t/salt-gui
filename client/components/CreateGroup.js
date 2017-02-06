import React, {Component} from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import TextArea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';
import Divider from 'muicss/lib/react/divider';

export default class CreateGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addScript: false,
            groupName: '',
            scriptName: '',
            scriptContent: '',
            scripts: [],
            showDropdown: false,
            rerenderList: [],
            rerenderDropdown: false
        };

        this.addScript = this.addScript.bind(this);
        this.createModel = this.createModel.bind(this);
    }

    addScript() {
        this.setState({
            addScript: true
        });
    }

    setScriptName(name) {
        this.setState({scriptName: name});
    }

    setScriptContent(content) {
        this.setState({scriptContent: content});
    }

    setGroupName(name) {

        let input = document.getElementById('group'),
            _this = this;

        document.onclick = function(e) {
            if(e.target.className != input.className && _this.state.showDropdown) {
                _this.setState({showDropdown: false});
            }
        };

        this.setState({
            groupName: name,
            showDropdown: true
        });
    }

    showDropdown() {
        this.setState({showDropdown: true});
    }

    cancelAddScript() {
        this.setState({
            addScript: false,
            scriptName: '',
            scriptContent: '',
        })
    }

    selectGroup(group) {
        let input = document.getElementById('group');

        input.value = group;
        input.focus();
        input.className.replace('mui--is-empty', '');
        input.className += ' mui--is-not-empty';
        this.setState({showDropdown: false})
    }

    rerenderGroupList(groupName) {
        let obj = [];

        let group = this.props.groups.filter((item) => {
            return item.group.toLowerCase().search(groupName.toLowerCase()) !== -1
        });

        for (let i = 0; i < group.length; i++) {
            obj.push({
                group: group[i].group,
            })
        }

        this.setState({
            rerenderList: obj,
            rerenderDropdown: true
        });

    }

    addScriptForm(id) {
        return <div className={id}><Input label='Название скрипта' floatingLabel={true} onChange={(e) => {
            this.setScriptName(e.target.value);
        }}/>
            <TextArea label='Текст скрипта' floatingLabel={true} onChange={(e) => {
                this.setScriptContent(e.target.value)
            }} className='modal__textarea'/>
            <Button size='small' color='primary' variant='flat'
                    onClick={() => {
                        this.addScript();
                        this.createScriptStore();
                    }} className='modal__btn'
                    disabled={!this.state.scriptName.length || !this.state.scriptContent}>Добавить</Button>
            <Button size='small' color='primary' variant='flat' onClick={() => {
                this.cancelAddScript();
            }} className='modal__btn'>Отмена</Button>
        </div>
    }

    createScriptStore() {
        this.state.scripts.push({
            name: this.state.scriptName,
            content: this.state.scriptContent
        });

        this.setState({
            addScript: false,
            scriptName: '',
            scriptContent: ''
        });
    }

    createModel() {
        let obj = {
            group: this.state.groupName,
            scripts: []
        };

        this.state.scripts.map((script) => {
            obj.scripts.push({
                name: script.name,
                content: script.content
            })
        });

        try {

            this.props.createGroup(obj);
            this.props.closeModal();

            this.setState({
                addScript: false,
                groupName: '',
                scriptName: '',
                scriptContent: '',
                scripts: [],
                showDropdown: false,
                rerenderList: [],
                rerenderDropdown: false
            });

        } catch (e) {
            console.error(new Error(e));
        }

    }

    render() {

        let dropdownList = !this.state.rerenderDropdown ?
            this.props.groups.length > 0 ?
                <ul className='group__list mui-list--unstyled' ref='dropdown'>
                    {this.props.groups.map((group, index) => {
                        return <li className='group__list_item' key={index} onClick={() => {
                            this.selectGroup(group.group)
                        }}>{group.group}</li>
                    })}
                </ul> : null :
            this.state.rerenderList.length > 0 ?
                <ul className='group__list mui-list--unstyled' ref='dropdown'>
                    {this.state.rerenderList.map((group, index) => {
                        return <li className='group__list_item' key={index} onClick={() => {
                            this.selectGroup(group.group)
                        }}>{group.group}</li>
                    })}
                </ul> : null;

        return <div className='modal__content'>
            <div className='modal__close_btn' onClick={this.props.closeModal}>X</div>
            <h4 className='mui--text-center modal__header'>Создание группы и скриптов</h4>
            <Form className='modal__form'>
                <div className='modal__form_group'>
                    <Input label='Название группы' floatingLabel={true} name='group' id='group' onChange={(e) => {
                        this.setGroupName(e.target.value);
                        this.rerenderGroupList(e.target.value);
                    }} onFocus={(e) => {
                        this.setGroupName(e.target.value)
                    }}/>
                    <div className='dropdown-btn' onClick={this.showDropdown.bind(this)}><span
                        className='mui-caret'></span></div>
                    {this.state.showDropdown ? dropdownList : null}
                </div>
                <div className='modal__content_scripts'>
                    <ul className='mui-list--inline scripts__list'>
                        {this.state.scripts.length > 0 ? this.state.scripts.map((script, index) => {
                                return <li key={index} className='scripts__list_item'>{script.name}</li>
                            }) : null}
                    </ul>
                    {this.state.addScript ? null :
                        <Button size='small' color='primary' variant='flat' onClick={this.addScript.bind(this)}
                                className='modal__btn mui--pull-right'>
                            Добавить скрипт
                        </Button>}
                </div>
                {this.state.addScript ? this.addScriptForm(new Date().getTime()) : null}
            </Form>
            {!this.state.addScript ?
                <div className='modal__footer'>
                    <Divider />
                    <Button size='small' color='primary' variant='flat'
                            onClick={this.createModel} className='modal__btn mui--pull-right'
                            disabled={!this.state.groupName}>Сохранить</Button>
                </div> : null}
        </div>
    }
}