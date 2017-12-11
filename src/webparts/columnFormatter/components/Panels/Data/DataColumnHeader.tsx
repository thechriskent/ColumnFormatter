import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { columnTypes } from '../../../state/State';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

const iconStyles: Partial<IIconStyles> = {
	root: {
		width: "14px",
		height: "100%",
		padding: "0",
		fontSize: "12px",
		lineHeight: "21px",
		cursor: "default"
	}
};

const buttonStyles: Partial<IButtonStyles> = {
	root: {
		width: "14px",
		height: "24px",
		padding: "0"
	},
	icon: {
		fontSize: "12px",
		lineHeight: "21px"
	}
};

export interface IDataColumnHeaderProps {
	name: string;
	type: columnTypes;
	editable: boolean;
	onNameChanged: (newValue:string) => void;
	onTypeChanged: (newValue:columnTypes) => void;
}

export interface IDataColumnHeaderState {
	typeChooserVisible: boolean;
}

export class DataColumnHeader extends React.Component<IDataColumnHeaderProps, IDataColumnHeaderState> {

	private _container: HTMLElement;
	
	public constructor(){
		super();
		this.state = {
			typeChooserVisible: false
		};
	}

	public render(): React.ReactElement<IDataColumnHeaderProps> {
		return (
			<div className={styles.propAndButtonBox} ref={(container) => this._container = container!}>
				<div className={styles.mainBox}>
					{!this.props.editable && (
						<span>{this.props.name}</span>
					)}
					{this.props.editable && (
						<TextField
						 value={this.props.name}
						 onChanged={this.props.onNameChanged}/>
					)}
				</div>
				<div className={styles.buttonBox}>
					{!this.props.editable && (
						<Icon
						 iconName={this.iconForType(this.props.type)}
						 title={this.textForType(this.props.type)}
						 styles={iconStyles}/>
					)}
					{this.props.editable && (
						<IconButton
						 iconProps={{iconName:this.iconForType(this.props.type)}}
						 title={this.textForType(this.props.type)}
						 onClick={this.onTypeIconClick}
						 styles={buttonStyles}/>
					)}
				</div>
				{this.state.typeChooserVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline={strings.ColumnTypeHeadline}
					 onDismiss={this.onTypeIconClick}>
					 	<div className={styles.tbChoiceGroupOverride}>
							<ChoiceGroup
							 selectedKey={this.props.type.toString()}
							 onChange={this.onTypeChange}
							 options={[
								this.optionForType(columnTypes.choice),
								this.optionForType(columnTypes.datetime),
								this.optionForType(columnTypes.link),
								this.optionForType(columnTypes.lookup),
								this.optionForType(columnTypes.number),
								this.optionForType(columnTypes.person),
								this.optionForType(columnTypes.picture),
								this.optionForType(columnTypes.text),
								this.optionForType(columnTypes.boolean)
							]}/>
						 </div>
					</TeachingBubble>
				)}
			</div>
		);
	}

	private iconForType(type:columnTypes): string {
		switch(type){
			case columnTypes.boolean:
				return 'SkypeCheck';
			case columnTypes.choice:
				return 'Filter';
			case columnTypes.datetime:
				return 'DateTime2';
			case columnTypes.link:
				return 'Link';
			case columnTypes.picture:
				return 'Camera';
			case columnTypes.lookup:
				return 'SortUp';
			case columnTypes.number:
				return 'NumberField';
			case columnTypes.person:
				return 'Emoji2';
			case columnTypes.text:
				return 'Font';
			default:
				return 'IncidentTriangle';
		}
	}

	private textForType(type:columnTypes): string {
		switch(type){
			case columnTypes.boolean:
				return strings.ColumnTypeBoolean;
			case columnTypes.choice:
				return strings.ColumnTypeChoice;
			case columnTypes.datetime:
				return strings.ColumnTypeDateTime;
			case columnTypes.link:
				return strings.ColumnTypeLink;
			case columnTypes.picture:
				return strings.ColumnTypePicture;
			case columnTypes.lookup:
				return strings.ColumnTypeLookup;
			case columnTypes.number:
				return strings.ColumnTypeNumber;
			case columnTypes.person:
				return strings.ColumnTypePerson;
			case columnTypes.text:
				return strings.ColumnTypeText;
			default:
				return strings.ColumnTypeUnknown;
		}
	}

	private optionForType(type:columnTypes): IChoiceGroupOption {
		return {
			key: type.toString(),
			text: this.textForType(type),
			iconProps: {
				iconName: this.iconForType(type)
			}
		};
	}

	@autobind
	private onTypeIconClick(): void {
		this.setState({
			typeChooserVisible: !this.state.typeChooserVisible
		});
	}

	@autobind
	private onTypeChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
	  this.props.onTypeChanged(+option.key);
	}
}