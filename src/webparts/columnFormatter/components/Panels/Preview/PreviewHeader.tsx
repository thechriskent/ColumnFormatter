import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState } from '../../../state/State';

const iconStyles: Partial<IIconStyles> = {
	root: {
		width: "20px",
		height: "100%",
		padding: "0",
		fontSize: "20px",
		lineHeight: "20px",
		cursor: "default"
	}
};

export interface IPreviewHeaderProps {
	validationErrors: Array<string>;
}

export interface IPreviewHeaderState {
	validationErrorsVisible: boolean;
}

class PreviewHeader_ extends React.Component<IPreviewHeaderProps, IPreviewHeaderState> {

	constructor(props:IPreviewHeaderProps) {
		super(props);

		this.state = {
			validationErrorsVisible: false
		};
	}

	public render(): React.ReactElement<IPreviewHeaderProps> {
		let isValid:boolean = this.props.validationErrors.length == 0;
		return (
		  <div className={styles.previewHeader}>
			<div className={styles.mainBox}>
		  		<span className={styles.panelHeader}>{strings.PanelHeaderPreview}</span>
			</div>
			<div className={styles.buttonBox + ' ' + (isValid ? styles.valid : styles.invalid)}>
				<Icon
				 iconName={isValid ? 'Emoji2' : 'EmojiDisappointed'}
				 title={isValid ? strings.PreviewValidationGood : strings.PreviewValidationBad + '\n' + this.props.validationErrors.join('\n')}
				 styles={iconStyles}/>
			</div>
		  </div>
		);
	}

	@autobind
	private onInvalidButtonClick(): void {
		this.setState({
			validationErrorsVisible: !this.state.validationErrorsVisible
		});
	}
}

function mapStateToProps(state: IApplicationState): IPreviewHeaderProps{
	return {
		validationErrors: state.code.validationErrors
	};
}

export const PreviewHeader = connect(mapStateToProps, null)(PreviewHeader_);