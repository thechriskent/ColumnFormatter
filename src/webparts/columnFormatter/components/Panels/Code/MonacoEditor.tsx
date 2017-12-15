import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { ColumnFormattingSchemaURI, ColumnFormattingSchema} from '../../../helpers/ColumnFormattingSchema';
import { editorThemes } from '../../../state/State';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
//import * as Ajv from 'ajv';
//var metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');
const monaco = require('../../../../../MonacoCustomBuild');

export interface IMonacoEditorProps {
	value: string;
	theme: editorThemes;
	onValueChange: (newValue:string, validationErrors:Array<string>) => void;
}

export interface IMonacoEditorState {

}

export class MonacoEditor extends React.Component<IMonacoEditorProps, IMonacoEditorState> {

	private _container: HTMLElement;
	private _editor: any;
	//private _ajv: any;

	constructor(props:IMonacoEditorProps) {
		super(props);

		//Setup the independent schema validator
		/*this._ajv = new Ajv({
			meta: false,
			extendRefs: true,
			unknownFormats: 'ignore'
		});
		this._ajv.addMetaSchema(metaSchema);
		this._ajv._opts.defaultMeta = metaSchema.id;
		this._ajv._refs['http://json-schema.org/schema'] = 'http://json-schema.org/draft-04/schema';
		this._ajv.removeKeyword('propertyNames');
		this._ajv.removeKeyword('contains');
		this._ajv.removeKeyword('const');
		this._ajv.addSchema({
			...ColumnFormattingSchema,
			id: ColumnFormattingSchemaURI
		});*/
	}

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
		this._editor.onDidChangeModelContent(this.onDidChangeModelContent);
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

	@autobind
	private onDidChangeModelContent(e:any): void {
		if(this._editor) {
			let curVal:string = this._editor.getValue();
			if(curVal !== this.props.value) {
				let validationErrors:Array<string> = new Array<string>();
				try {
					let curObj:any = JSON.parse(curVal);
					/*let isValid:boolean = this._ajv.validate(curVal);
					if(!isValid) {
						validationErrors = this._ajv.errors;
					}*/
				} catch (e) {
					validationErrors.push(e.message);
				}
				this.props.onValueChange(curVal, validationErrors);
			}
		}
	}
}