import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
const monaco = require('../../../../../MonacoCustomBuild');

export interface IMonacoEditorProps {
	value: string;
}

export interface IMonacoEditorState {

}

export class MonacoEditor extends React.Component<IMonacoEditorProps, IMonacoEditorState> {

	private _container: HTMLElement;
	private _editor: any;

	public componentDidMount(): void {
		this._editor = monaco.editor.create(this._container, {
			value: this.props.value,
			scrollBeyondLastLine: false,
			theme: 'vs-dark',
			language: 'json'
			//height: '300px',
			//width: '100%'
		});
	}

	public componentDidUpdate(prevProps:IMonacoEditorProps) {
		if(this.props.value !== prevProps.value) {
			if(this._editor) {
				this._editor.setValue(this.props.value);
			}
		}
		if(this._editor) {
			this._editor.layout();
		}
	}

	public componentWillUnmount(): void {
		if(this._editor) {
			this._editor.dispose();
		}
	}

	public render(): React.ReactElement<IMonacoEditorProps> {
		return (
		  <div ref={(container) => this._container = container!} className={styles.codeEditor} />
		);
	}
}