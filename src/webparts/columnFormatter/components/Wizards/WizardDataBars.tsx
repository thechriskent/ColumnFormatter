import * as React from 'react';
import styles from '../ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IWizard, Wizards } from './WizardCommon';
import { columnTypes } from '../../state/State';

export const WizardInfoDataBars: IWizard = {
	name: 'Data Bars',
	description: 'Adds horizontal bars to the field to visually express the value by length',
	iconName: 'Mail',
	fieldTypes: [
		columnTypes.number
	]
};

export interface IWizardDataBarsProps {

}

export interface IWizardDataBarsState {
	
}

export class WizardDataBars extends React.Component<IWizardDataBarsProps, IWizardDataBarsState> {

	private _container: HTMLElement;
	
	public constructor(){
		super();
		this.state = {
			typeChooserVisible: false
		};
	}

	public render(): React.ReactElement<IWizardDataBarsProps> {
		return (
			<div>
				Wizard Data Bars
			</div>
		);
	}
}