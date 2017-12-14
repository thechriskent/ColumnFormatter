import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { ColumnFormattingSchemaURI, ColumnFormattingSchema} from '../../../helpers/ColumnFormattingSchema';
import { editorThemes } from '../../../state/State';
const monaco = require('../../../../../MonacoCustomBuild');

export interface IMonacoEditorProps {
	value: string;
	theme: editorThemes;
	onValueChange: (newValue:string) => void;
}

export interface IMonacoEditorState {

}

export class MonacoEditor extends React.Component<IMonacoEditorProps, IMonacoEditorState> {

	private _container: HTMLElement;
	private _editor: any;

	public componentDidMount(): void {
		//Add Column Formatter Schema for validation
		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			schemas: [{
				uri: ColumnFormattingSchemaURI,
				schema: ColumnFormattingSchema
			}],
			validate: true,
			allowComments: true
		});

		//Adjust tab size once things are ready
		monaco.editor.onDidCreateModel((m:any) => {
			m.updateOptions({
				tabSize: 2
			});
		});

		//Create the editor
		this._editor = monaco.editor.create(this._container, {
			value: this.props.value,
			scrollBeyondLastLine: false,
			theme: this.props.theme,
			language: 'json',
			folding: true,
			renderIndentGuides: true
		});

		//Subscribe to changes
		this._editor.onDidChangeModelContent((e:any) => {
			if(this._editor) {
				let curVal:string = this._editor.getValue();
				if(curVal !== this.props.value) {
					this.props.onValueChange(curVal);
				}
			}
		});
	}

	public componentDidUpdate(prevProps:IMonacoEditorProps) {
		if(this.props.value !== prevProps.value) {
			if(this._editor) {
				this._editor.setValue(this.props.value);
			}
		}
		if(this.props.theme !== prevProps.theme) {
			monaco.editor.setTheme(this.props.theme);
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