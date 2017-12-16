import { columnTypes } from '../../state/State';
import { WizardInfoDataBars } from './WizardDataBars';

export interface IWizard {
	name: string;
	description: string;
	iconName: string;
	fieldTypes: Array<columnTypes>;
}

export const Wizards: Array<IWizard> = [
	WizardInfoDataBars
];