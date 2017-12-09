import * as React from 'react';
import styles from '../../ColumnFormatter.module.scss';
import { columnTypes } from '../../../state/State';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

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
					<TextField
					value={this.props.name}
					onChanged={this.props.onNameChanged}/>
				</div>
				<div className={styles.buttonBox}>
				<IconButton
				 iconProps={{iconName:this.iconForType(this.props.type)}}
				 title={this.textForType(this.props.type)}
				 onClick={this.onTypeIconClick}
				 styles={buttonStyles}/>
				</div>
				{this.state.typeChooserVisible && (
					<TeachingBubble
					 targetElement={this._container}
					 hasCloseIcon={true}
					 hasCondensedHeadline={true}
					 headline="Column Type"
					 onDismiss={this.onTypeIconClick}>
					 	<div className={styles.tbChoiceGroupOverride}>
							<ChoiceGroup
							 selectedKey={this.props.type}
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
				return 'Yes/No';
			case columnTypes.choice:
				return 'Choice';
			case columnTypes.datetime:
				return 'Date/Time';
			case columnTypes.link:
				return 'Hyperlink';
			case columnTypes.picture:
				return 'Picture';
			case columnTypes.lookup:
				return 'Lookup';
			case columnTypes.number:
				return 'Number';
			case columnTypes.person:
				return 'Person';
			case columnTypes.text:
				return 'Text';
			default:
				return 'Unknown';
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