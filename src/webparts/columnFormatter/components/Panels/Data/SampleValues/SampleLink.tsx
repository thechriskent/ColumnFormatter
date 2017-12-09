import * as React from 'react';
import styles from '../../../ColumnFormatter.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { ILinkFieldValue } from '../../../../state/State';

const propButtonStyles: Partial<IButtonStyles> = {
	root: {
		width: "14px",
		height: "24px",
		padding: "0"
	},
	icon: {
		fontSize: "20px",
		lineHeight: "20px"
	}
};

export interface ISampleLinkProps {
	value: ILinkFieldValue;
	onChanged: (newValue:ILinkFieldValue) => void;
}

export interface ISampleLinkState {
	subPropertiesVisible: boolean;
}

export class SampleLink extends React.Component<ISampleLinkProps, ISampleLinkState> {
	
	private _container: HTMLElement;

	public constructor(){
		super();
		this.state = {
			subPropertiesVisible: false
		};
	}

	public render(): React.ReactElement<ISampleLinkProps> {
		return (
		  <div className={styles.subPropBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					<TextField
					 value={this.props.value.URL}
					 onChanged={this.linkURLChanged}/>
				</div>
				<div className={styles.buttonBox}>
					<IconButton
					 iconProps={{iconName:'CaretHollow'}}
					 title="Sub Properties"
					 onClick={this.subPropertiesButtonClick}
					 styles={propButtonStyles}/>
				</div>
				{this.state.subPropertiesVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline="Sub Properties"
					 onDismiss={this.subPropertiesButtonClick}>
					 	<div className={styles.tbTextFieldOverride}>
							<TextField
							 value={this.props.value.desc}
							 onChanged={this.linkDescChanged}
							 label="desc:"/>
						</div>
					</TeachingBubble>
				)}
		  </div>
		);
	}

	@autobind
	private linkURLChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			URL: newValue
		});
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private linkDescChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			desc: newValue
		});
	}
}