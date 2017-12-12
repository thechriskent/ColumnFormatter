import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
const monaco = require('@timkendrick/monaco-editor');

export interface IMonacoEditorProps {
}

export interface IMonacoEditorState {

}

export class MonacoEditor extends React.Component<IMonacoEditorProps, IMonacoEditorState> {

	private _container: HTMLElement;

	public componentDidMount(): void {
		monaco.editor.create(this._container, {
			language: 'json',
			height: '100%',
			width: '100%'
		});
	}

	public render(): React.ReactElement<IMonacoEditorProps> {
		return (
		  <div ref={(container) => this._container = container!} />
		);
	}
}