import * as React from 'react';
import styles from '../../../ColumnFormatter.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { ILookupFieldValue } from '../../../../state/State';

const spinStyles: Partial<ISpinButtonStyles> = {
	label: {
		color: "white !important"
	}
};

const buttonStyles: Partial<IButtonStyles> = {
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
		  <div ref={(container) => this._container = container!}>
				<TextField value={this.props.value.lookupValue} onChanged={this.props.onChanged}/>
				<IconButton iconProps={{iconName:'Emoji2'}} title="Sub Properties" onClick={this.subPropertiesButtonClick}/>
				{this.state.subPropertiesVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline="Lookup Sub Properties"
					 onDismiss={this.subPropertiesButtonClick}>
						<SpinButton
						 value={this.props.value.lookupId.toString()}
						 label="lookupId:"
						 onIncrement={this.onLookupIdIncrement}
						 onDecrement={this.onLookupIdDecrement}
						 styles={spinStyles}
						 upArrowButtonStyles={buttonStyles}
						 downArrowButtonStyles={buttonStyles}/>
					</TeachingBubble>
				)}
		  </div>
		);
	}

	@autobind
	private lookupValueChanged(newValue: string): void {
		this.props.onChanged({
			lookupValue: newValue,
			lookupId: this.props.value.lookupId
		});
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private onLookupIdIncrement(value:string): string {
		let newValue: number = +value + 1;
		this.props.onChanged({
			lookupValue: this.props.value.lookupValue,
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
			lookupValue: this.props.value.lookupValue,
			lookupId: newValue
		});
		return newValue.toString();
	}
}