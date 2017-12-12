import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../state/State';
import { MonacoEditor } from './MonacoEditor';

export interface ICodeEditorProps {
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
		  <div>
			  <MonacoEditor/>
		  </div>
		);
	}
}

function mapStateToProps(state: IApplicationState): ICodeEditorProps{
	return {
		
	};
}

export const CodeEditor = connect(mapStateToProps, null)(CodeEditor_);