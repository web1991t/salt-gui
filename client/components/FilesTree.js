import React, {PropTypes, Component} from 'react';
import FileDescription from '../components/FileDescription';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';
import TreeView from './tree/TreeView';
import Input from 'muicss/lib/react/input';
import CreateGroup from './CreateGroup';
import Modal from 'react-modal';

export class FilesTree extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showFileDescription: false,
            scriptName: '',
            filterScripts: [],
            rerender: false,
            showModal: false
        };
        this.showContent = this.showContent.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    componentDidMount() {
        this.props.filesRequest();
    }

    showContent(scriptName) {
        this.props.getScriptContent(scriptName);

        this.setState({
            showFileDescription: true,
        })
    }

    showModal() {
        this.setState({showModal: true});
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

    render() {

        let _this = this, template, fileDescription;

        if (_this.state.showFileDescription) {

            fileDescription = <FileDescription scriptContent={this.props.scriptContent}
                                               script={this.props.script}/>;
        }

        if (this.props.files.length === 0) {
            template = <div>Данных нету</div>
        } else if (this.state.rerender) {
            template = <TreeView groups={this.state.filterScripts} showContent={this.showContent}/>;
        } else {
            template = <TreeView groups={this.props.files} showContent={this.showContent}/>;
        }

        return <Container>
            <Row>
                <Col md='3' xs='6' lg='3'>
                    <Input label='Поиск' floatingLabel={true} onChange={this.filterTree.bind(this)}/>
                    <ul className='list mui-list--unstyled'>
                        {template}
                    </ul>
                    <button className='mui-btn button' onClick={this.showModal}>добавить</button>
                </Col>
                <Col md='9' xs='6' lg='9'>
                    <div className=''>
                        {fileDescription || ''}
                    </div>
                </Col>
            </Row>
            <Modal contentLabel='label' isOpen={this.state.showModal} className='modal'
                   onRequestClose={this.onRequestClose.bind(this)} overlayClassName='overlay'
                   parentSelector={() => document.body} ariaHideApp={false}>
                <CreateGroup createGroup={this.props.createGroup} groups={this.props.files}
                             closeModal={this.onRequestClose} error={this.props.error} createSuccess={this.props.createSuccess}/>
            </Modal>
        </Container>
    }
}

FilesTree.propTypes = {
    filesRequest: PropTypes.func.isRequired,
    // error: PropTypes.string.isRequired
};