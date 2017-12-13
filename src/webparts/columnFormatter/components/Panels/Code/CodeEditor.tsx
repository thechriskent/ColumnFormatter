import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { IApplicationState, IPaneSize } from '../../../state/State';
import { MonacoEditor } from './MonacoEditor';

export interface ICodeEditorProps {
	mainPane:number;
	splitPane:number;
}

export interface ICodeEditorState {
	code: string;
}

class CodeEditor_ extends React.Component<ICodeEditorProps, ICodeEditorState> {

	constructor(props: ICodeEditorProps) {
		super(props);
		this.state = {
			code: 'hey there!'
		};
	}

	public render(): React.ReactElement<ICodeEditorProps> {
		return (
			<MonacoEditor
				value={this.props.mainPane.toString()}
			/>
		);
	}
}

function mapStateToProps(state: IApplicationState): ICodeEditorProps{
	return {
		mainPane: state.panes.main,
		splitPane: state.panes.split
	};
}

export const CodeEditor = connect(mapStateToProps, null)(CodeEditor_);