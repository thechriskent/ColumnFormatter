import * as React from 'react';
import styles from '../../../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { ILookupFieldValue } from '../../../../state/State';
import { SubPropsButton } from './SubPropsButton';

const spinStyles: Partial<ISpinButtonStyles> = {
	label: {
		color: "white !important"
	}
};

const sbuttonStyles: Partial<IButtonStyles> = {
	root: {
		backgroundColor: "white"
	}
};

export interface ISampleLookupProps {
	value: ILookupFieldValue;
	onChanged: (newValue:ILookupFieldValue) => void;
}

export interface ISampleLookupState {
	subPropertiesVisible: boolean;
}

export class SampleLookup extends React.Component<ISampleLookupProps, ISampleLookupState> {
	
	private _container: HTMLElement;

	public constructor(){
		super();
		this.state = {
			subPropertiesVisible: false
		};
	}

	public render(): React.ReactElement<ISampleLookupProps> {
		return (
		  <div className={styles.propAndButtonBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					<TextField
					 value={this.props.value.lookupValue}
					 onChanged={this.lookupValueChanged}/>
				</div>
				<div className={styles.buttonBox}>
					<SubPropsButton
					 onClick={this.subPropertiesButtonClick}/>
				</div>
				{this.state.subPropertiesVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline={strings.SubPropertiesHeadline}
					 onDismiss={this.subPropertiesButtonClick}>
					 	<div className={styles.tbSpinButtonOverride}>
							<SpinButton
							value={this.props.value.lookupId.toString()}
							label="lookupId:"
							labelPosition={Position.top}
							onValidate={this.onLookupIdValidate}
							onIncrement={this.onLookupIdIncrement}
							onDecrement={this.onLookupIdDecrement}
							styles={spinStyles}
							upArrowButtonStyles={sbuttonStyles}
							downArrowButtonStyles={sbuttonStyles}/>
						 </div>
					</TeachingBubble>
				)}
		  </div>
		);
	}

	@autobind
	private lookupValueChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			lookupValue: newValue
		});
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private onLookupIdValidate(value:string): string {
		if(isNaN(+value)){
			this.props.onChanged({
				...this.props.value,
				lookupId: 1
			});
			return "1";
		}
		this.props.onChanged({
			...this.props.value,
			lookupId: +value
		});
		return value;
	}

	@autobind
	private onLookupIdIncrement(value:string): string {
		let newValue: number = +value + 1;
		this.props.onChanged({
			...this.props.value,
			lookupId: newValue
		});
		return newValue.toString();
	}

	@autobind
	private onLookupIdDecrement(value:string): string {
		let newValue: number = +value - 1;
		if(newValue < 1) {
			newValue = 1;
		}
		this.props.onChanged({
			...this.props.value,
			lookupId: newValue
		});
		return newValue.toString();
	}
}