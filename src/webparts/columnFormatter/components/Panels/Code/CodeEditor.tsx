import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateEditorString } from './../../../state/Actions';
import { IApplicationState, ICode, editorThemes } from '../../../state/State';
import { MonacoEditor } from './MonacoEditor';

export interface ICodeEditorProps {
	theme?:editorThemes;
	editorString?:string;

	updateEditorString?: (editorString:string, validationErrors:Array<string>) => void;

	//only subscribed so that the editor will be updated and know to
	// recalculate layout
	mainPane?:number;
	splitPane?:number;
}

export interface ICodeEditorState {
	//code: string;
}

class CodeEditor_ extends React.Component<ICodeEditorProps, ICodeEditorState> {

	constructor(props: ICodeEditorProps) {
		super(props);
	}

	public render(): React.ReactElement<ICodeEditorProps> {
		return (
			<MonacoEditor
				value={this.props.editorString}
				theme={this.props.theme}
				onValueChange={this.props.updateEditorString}
			/>
		);
	}
}

function mapStateToProps(state: IApplicationState): ICodeEditorProps{
	return {
		theme: state.code.theme,
		editorString: state.code.editorString,
		mainPane: state.ui.panes.main,
		splitPane: state.ui.panes.split
	};
}

function mapDispatchToProps(dispatch: Dispatch<ICodeEditorProps>): ICodeEditorProps{
	return {
		updateEditorString: (editorString:string, validationErrors:Array<string>) => {
			dispatch(updateEditorString(editorString, validationErrors));
		}
    };
}

export const CodeEditor = connect(mapStateToProps, mapDispatchToProps)(CodeEditor_);