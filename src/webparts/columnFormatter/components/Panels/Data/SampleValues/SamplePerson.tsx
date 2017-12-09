import * as React from 'react';
import styles from '../../../ColumnFormatter.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IPersonFieldValue } from '../../../../state/State';
import { SubPropsButton } from './SubPropsButton';

const spinStyles: Partial<ISpinButtonStyles> = {
	label: {
		color: "white !important"
	},
	labelWrapper: {
		marginBottom: "0"
	}
};

const sbuttonStyles: Partial<IButtonStyles> = {
	root: {
		backgroundColor: "white"
	}
};

export interface ISamplePersonProps {
	value: IPersonFieldValue;
	onChanged: (newValue:IPersonFieldValue) => void;
}

export interface ISamplePersonState {
	subPropertiesVisible: boolean;
}

export class SamplePerson extends React.Component<ISamplePersonProps, ISamplePersonState> {
	
	private _container: HTMLElement;

	public constructor(){
		super();
		this.state = {
			subPropertiesVisible: false
		};
	}

	public render(): React.ReactElement<ISamplePersonProps> {
		return (
		  <div className={styles.subPropBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					<TextField
					 value={this.props.value.title}
					 onChanged={this.titleChanged}/>
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
					 headline="Sub Properties"
					 onDismiss={this.subPropertiesButtonClick}>
					 	<div className={styles.tbSpinButtonOverride}>
							<SpinButton
							value={this.props.value.id.toString()}
							label="id:"
							labelPosition={Position.top}
							onValidate={this.onIdValidate}
							onIncrement={this.onIdIncrement}
							onDecrement={this.onIdDecrement}
							styles={spinStyles}
							upArrowButtonStyles={sbuttonStyles}
							downArrowButtonStyles={sbuttonStyles}/>
						 </div>
						 <div className={styles.tbTextFieldOverride}>
							<TextField
							 value={this.props.value.email}
							 onChanged={this.emailChanged}
							 label="email:"/>
						</div>
						<div className={styles.tbTextFieldOverride}>
							<TextField
							 value={this.props.value.sip}
							 onChanged={this.sipChanged}
							 label="sip:"/>
						</div>
						<div className={styles.tbTextFieldOverride}>
							<TextField
							 value={this.props.value.picture}
							 onChanged={this.pictureChanged}
							 label="picture:"/>
						</div>
					</TeachingBubble>
				)}
		  </div>
		);
	}

	@autobind
	private titleChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			title: newValue
		});
	}

	@autobind
	private subPropertiesButtonClick(): void {
		this.setState({
			subPropertiesVisible: !this.state.subPropertiesVisible
		});
	}

	@autobind
	private onIdValidate(value:string): string {
		if(isNaN(+value)){
			this.props.onChanged({
				...this.props.value,
				id: 1
			});
			return "1";
		}
		this.props.onChanged({
			...this.props.value,
			id: +value
		});
		return value;
	}

	@autobind
	private onIdIncrement(value:string): string {
		let newValue: number = +value + 1;
		this.props.onChanged({
			...this.props.value,
			id: newValue
		});
		return newValue.toString();
	}

	@autobind
	private onIdDecrement(value:string): string {
		let newValue: number = +value - 1;
		if(newValue < 1) {
			newValue = 1;
		}
		this.props.onChanged({
			...this.props.value,
			id: newValue
		});
		return newValue.toString();
	}

	@autobind
	private emailChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			email: newValue
		});
	}

	@autobind
	private sipChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			sip: newValue
		});
	}

	@autobind
	private pictureChanged(newValue: string): void {
		this.props.onChanged({
			...this.props.value,
			picture: newValue
		});
	}
}