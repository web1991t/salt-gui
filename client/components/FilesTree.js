import React, {Component} from 'react';
import FileDescription from '../components/FileDescription';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';
import TreeView from './tree/TreeView';
import Input from 'muicss/lib/react/input';
import CreateGroup from './CreateGroup';
import Modal from 'react-modal';
import EditScript from './EditScript';
import RemoveScript from './RemoveScript';
import EditMinionsGroup from './minions/EditMinionsGroupModal';
import RemoveMinionsGroupModal from './minions/RemoveMinionsGroupModal';
import TreeViewModalCheckboxes from './treeModalCheckboxes/TreeViewModalCheckboxes';

export class FilesTree extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showFileDescription: false,
            scriptName: '',
            filterScripts: [],
            rerender: false,
            showModal: false,
            editScript: false,
            removeScript: false,
            getFiles: false,
            addScript: false,
            editGroup: false,
            removeGroup: false,
            runScript: false,
            editedGroup: {},
            removedGroup: {}
        };
    }

    componentDidMount() {
        if (typeof this.props.filesRequest === 'function') {
            this.props.filesRequest();
        }
    }

    componentDidUpdate() {
        if (this.state.getFiles) {
            this.props.filesRequest();
            this.setState({getFiles: false});
        }

        if (this.props.editGroupSuccess || this.props.removeGroupSuccess) {
            this.setState({
                showModal: false,
                removeGroup: false,
            });
        }

        if (this.props.execute && this.state.runScript) {
            this.setState({
                runScript: false
            });
            this.props.setExecuteFalse();
        }
    }

    hideContent() {
        this.setState({
            showFileDescription: false,
            getFiles: true
        });
    }

    showContent(scriptId) {
        this.props.getScriptContent(scriptId);
        this.props.setEditScriptFalse();
        this.props.setRemoveScriptErrorFalse();
        this.setState({
            showFileDescription: true,
            addScript: false,
            editScript: false,
            runScript: false
        })
    }

    addScript() {
        this.setState({
            addScript: true,
            editScript: false,
            removeScript: false,
            showFileDescription: false
        });
    }

    filterTree(e) {
        let obj = [];

        for (let i = 0; i < this.props.files.length; i++) {

            let scripts = this.props.files[i].scripts.filter((item) => {
                return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            });

            if (scripts.length > 0) {
                obj.push({
                    group: this.props.files[i].group,
                    scripts: scripts
                })
            }
        }

        this.setState({
            filterScripts: obj,
            rerender: true
        });
    }

    onRequestClose() {
        this.setState({showModal: false});
    }

    editScript(script) {
        this.props.setEditScriptFalse();
        this.setState({
            removeScript: false,
            editScript: true,
            addScript: false,
            showFileDescription: false,
            editingScript: script
        });
    }

    removeScriptState(script) {
        this.setState({
            removeScript: true,
            editingScript: script,
            showModal: true,
            editScript: false,
            runScript: false
        });
    }

    cancelAddGroupAndScript() {
        this.setState({addScript: false});
    }

    cancelEditScript() {
        this.setState({
            editScript: false,
            getFiles: true,
            showFileDescription: true
        });

        this.props.setEditScriptFalse();
        this.props.getScriptContent(this.state.editingScript.id);
    }

    editGroup(groupId, groupName) {
        this.setState({
            editGroup: true,
            removeScript: false,
            removeGroup: false,
            showModal: true,
            editedGroup: {
                id: groupId,
                name: groupName
            }
        });
    }

    removeGroup(groupId, groupName) {
        this.setState({
            removeGroup: true,
            editGroup: false,
            runScript: false,
            showModal: true,
            removedGroup: {
                id: groupId,
                name: groupName
            }
        })
    }

    runScript(scriptName) {
        this.setState({
            runScript: true,
            addScript: false,
            editScript: false,
            showFileDescription: false,
            scriptName: scriptName
        });

        this.props.getGroupedMinions();
        this.props.setExecuteFalse();
    }

    render() {

        let _this = this, template, modal, createEditGroup, fileDescription, selectMinions;

        if (_this.state.showFileDescription) {

            fileDescription = <FileDescription scriptContent={_this.props.scriptContent} editScript={::_this.editScript}
                                               removeScript={::_this.removeScriptState} script={_this.props.script}
                                               runScript={::_this.runScript}/>;
        }

        if (_this.props.files.length === 0) {
            template = <div>Данных нету</div>
        } else if (_this.state.rerender) {
            template =
                <TreeView groups={_this.state.filterScripts} showContent={::_this.showContent} removeIfNotEmpty={false}
                          removeGroup={::_this.removeGroup}/>;
        } else {
            template =
                <TreeView groups={_this.props.files} showContent={::_this.showContent} editGroup={::_this.editGroup}
                          removeIfNotEmpty={false} removeGroup={::_this.removeGroup}/>;
        }

        if (_this.state.editScript) {
            createEditGroup = <EditScript closeModal={::_this.onRequestClose} script={_this.state.editingScript}
                                          cancel={::_this.cancelEditScript} groups={_this.props.files}
                                          editScript={_this.props.editScript} editSuccess={_this.props.editSuccess}
                                          editScriptError={_this.props.editScriptError}/>
        } else if (_this.state.removeScript) {
            modal = <RemoveScript closeModal={::_this.onRequestClose} scriptRemove={_this.props.scriptRemove}
                                  filesRequest={_this.props.filesRequest}
                                  removeScriptError={_this.props.removeScriptError}
                                  script={_this.state.editingScript} removeSuccess={_this.props.removeSuccess}
                                  hideContent={::_this.hideContent}/>
        } else if (this.state.addScript) {
            createEditGroup = <CreateGroup createGroup={_this.props.createGroup} groups={_this.props.files}
                                           error={_this.props.error}
                                           createSuccess={_this.props.createSuccess}
                                           cancel={::_this.cancelAddGroupAndScript}/>
        } else if (_this.state.runScript) {
            selectMinions =
                <TreeViewModalCheckboxes groups={_this.props.groupedMinions}
                                         scriptName={_this.state.scriptName}
                                         executeScripts={_this.props.executeScripts}
                                         minions={true}
                                         execute={_this.props.execute}
                                         executeError={_this.props.executeError}/>
        }

        if (_this.state.showModal) {
            if (_this.state.removeGroup) {
                modal = <RemoveMinionsGroupModal group={_this.state.removedGroup} closeModal={::_this.onRequestClose}
                                                 removeGroup={_this.props.removeGroup}/>
            } else if (_this.state.editGroup) {
                modal = <EditMinionsGroup group={_this.state.editedGroup} closeModal={::_this.onRequestClose}
                                          groups={_this.props.files}
                                          edit={_this.props.editGroup}/>
            }
        }

        return <Container>
            <Row>
                <Col md='3' xs='6' lg='3'>
                    <Input label='Поиск скриптов' floatingLabel={true} onChange={::_this.filterTree}/>
                    <ul className='list mui-list--unstyled'>
                        {template}
                    </ul>
                    <button className='mui-btn button' onClick={::_this.addScript}>добавить группу</button>
                </Col>
                <Col md='9' xs='6' lg='9'>
                    {_this.state.addScript || _this.state.editScript ? createEditGroup : null}
                    {_this.state.showFileDescription ? fileDescription : null}
                    {_this.state.runScript ? selectMinions : null}
                    {_this.props.execute ?
                        <span className='success-mess'>Скрипты успешно отправлены на выполнение</span> : null}
                </Col>
            </Row>
            <Modal contentLabel='label' isOpen={_this.state.showModal} className='modal'
                   onRequestClose={::_this.onRequestClose} overlayClassName='overlay'
                   parentSelector={() => document.body} ariaHideApp={false}>
                {modal}
            </Modal>
        </Container>
    }
}