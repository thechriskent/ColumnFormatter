import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import DropZone from 'react-dropzone';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IFileUploaderProps {
	onTextLoaded: (text:string) => void;
}

export interface IFileUploaderState {
	isReceiverOpen: boolean;
	uploadError: string;
}

export class FileUploader extends React.Component<IFileUploaderProps, IFileUploaderState> {

	private _uploadPanel: any;

	constructor(props:IFileUploaderProps) {
		super(props);

		this.state = {
			isReceiverOpen: false,
			uploadError:''
		};
	}

	public render(): React.ReactElement<IFileUploaderProps> {
		return (
		  <div className={styles.uploadForm}>
				<span className={styles.headerLabel}>File Upload</span>
				<DropZone
				 ref={(container) => this._uploadPanel = container!}
				 accept='.json'
				 multiple={false}
				 onDrop={this.onFileDrop}
				 className={styles.dropZone}
				 activeClassName={styles.dropZoneActive}
				 rejectClassName={styles.dropZoneRejected}>
					<p>Drop your json file here, or click to select the file to upload.</p>
					<p>Only *.json files will be accepted</p>
				</DropZone>
				<PrimaryButton text='Choose a File' onClick={this.onChooseFileClick}/>
				<span className={styles.uploadError}>{this.state.uploadError}</span>
		  </div>
		);
	}

	@autobind
	private onChooseFileClick(): void {
		if(this._uploadPanel !== undefined) {
			this._uploadPanel.open();
		}
	}

	@autobind
	private onFileDrop(accepted:Array<any>, rejected:Array<any>): void {
		/*console.log('rejected');
		console.log(rejected);
		console.log('accepted');
		console.log(accepted);*/
		//Clean up rejected files
		try {
			if(rejected.length > 0) {
				for(var reject of rejected) {
					if(reject.preview !== undefined) {
						window.URL.revokeObjectURL(reject.preview);
					}
				}
				this.setState({
					uploadError: 'Unable to accept: ' + reject.name
				});
			} else {
				//Grab the accepted file
				if(accepted.length > 0) {
					var reader:FileReader = new FileReader();
					reader.onload = () => {
						let fileContents:string = reader.result;
						console.log(fileContents);
						//clean up files
						for(var acceptable of accepted) {
							if(acceptable.preview !== undefined) {
								window.URL.revokeObjectURL(acceptable.preview);
							}
						}
						if(fileContents.length > 0) {
							this.props.onTextLoaded(fileContents);
							this.setState({
								uploadError: ''
							});
						} else {
							this.setState({
								uploadError: 'File is empty!'
							});
						}
					};
					reader.readAsText(accepted[0]);
				}
			}
		}
		catch(ex) {
			this.setState({
				uploadError:ex.message
			});
		}
	}
}