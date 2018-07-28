import React from 'react';
import { EditorState, ContentState, convertToRaw} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
class HtmlEditorDialog extends React.Component{
	constructor(){
		super(...arguments);
		this.state={
			editorState:EditorState.createEmpty()
		};
	}
	componentDidMount(){
		let {content} = this.props;
		const editorState = this.toDraft(content);
		this.setState({editorState});
	}
	componentWillReceiveProps({content}){
		if(content !== this.props.content){
			const editorState = this.toDraft(content);
			this.setState({editorState});
		}
	}
	toDraft(html){
		if(!html)
			return EditorState.createEmpty();
		else{
			const blocksFromHtml = htmlToDraft(html);
			const contentBlocks = blocksFromHtml.contentBlocks;
			const contentState = ContentState.createFromBlockArray(contentBlocks);
			return EditorState.createWithContent(contentState);
		}
	}
	toHtml(editorState){
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		return draftToHtml(rawContentState);
	}
	handleSubmit(){
		let {onSubmit} = this.props;
		const html = this.toHtml(this.state.editorState);
		onSubmit(html);
	}
	render(){
		let {open,onCancel,title} = this.props;
		let {editorState} = this.state;
		return (
			<Dialog
				contentStyle={{minWidth:'90%'}}
				open={open}
				title={title}
				actions={[
					<FlatButton label="OK" onClick={this.handleSubmit.bind(this)}/>,
					<FlatButton label="Cancel" onClick={onCancel}/>
					]}
			>
				<Editor
					wrapperClassName="html-editor-wrapper"
  					editorClassName="html-editor"
				    editorState={editorState}
				    onEditorStateChange={(editorState)=>{this.setState({editorState});}}
				  />
			</Dialog>
			)
	}
}

export default HtmlEditorDialog;