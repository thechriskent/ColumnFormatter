import { columnTypes } from '../../state/State';
import { WizardInfoDataBars } from './WizardDataBars';

export interface IWizard {
	name: string;
	description: string;
	iconName: string;
	fieldTypes: Array<columnTypes>;
}

export const Wizards: Array<IWizard> = [
	WizardInfoDataBars,
	{
		name: 'Fake',
		description: 'Testing Purposes, not a real wizard',
		iconName: 'Mail',
		fieldTypes: [
			columnTypes.choice, columnTypes.datetime
		]
	}
];

export const getWizardByName = (name:string): IWizard | undefined => {
	for(var wizard of Wizards) {
		if(wizard.name == name) {
			return wizard;
		}
	}
	return undefined;
};

export const getWizardsForColumnType = (colType: columnTypes): Array<IWizard> => {
	return Wizards.filter((value: IWizard, index:number) => {
		if(colType !== undefined) {
			if(value.fieldTypes.length == 0 || value.fieldTypes.indexOf(colType) >= 0) {
				return true;
			}
			return false;
		}
		return true;
	});
};