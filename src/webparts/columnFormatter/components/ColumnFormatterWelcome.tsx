import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, columnTypes } from '../state/State';
import { iconForType, textForType } from '../helpers/ColumnTypeHelpers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IWizard } from './Wizards/WizardCommon';

export enum welcomeStage {
  start,
  new,
  open
}

export interface IColumnFormatterWelcomeProps {
}

export interface IColumnFormatterWelcomeState {
  stage: welcomeStage;
  columnType?: columnTypes;
  useWizardForNew: boolean;
  ChoosenWizardName?: string;
}

class ColumnFormatterWelcome_ extends React.Component<IColumnFormatterWelcomeProps, IColumnFormatterWelcomeState> {

  constructor(props:IColumnFormatterWelcomeProps) {
    super(props);

    this.state = {
      stage: welcomeStage.new,
      useWizardForNew: true
    };
  }

  public render(): React.ReactElement<IColumnFormatterWelcomeProps> {
    return (
      <div className={styles.welcome}>
        <div className={styles.welcomeBox}>
          {this.state.stage == welcomeStage.start && (
            <div>
              <div className={styles.header}>
                <h1>Column Formatter</h1>
                <span>Easy editor for modern listview Column Formatting</span>
              </div>
              <div className={styles.startButtons}>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.new);}}>
                  <div className={styles.icon}>
                    <Icon iconName='Filters'/>
                  </div>
                  <div className={styles.words}>
                    <h2>New</h2>
                    <span>Start with a blank canvas or choose from a template</span>
                  </div>
                </div>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.open);}}>
                  <div className={styles.icon}>
                    <Icon iconName='OpenFolderHorizontal'/>
                  </div>
                  <div className={styles.words}>
                    <h2>Open</h2>
                    <span>Load from a library or pull from a local list</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.new && (
            <div className={styles.newForm}>
              <div className={styles.columnType}>
                <Label required={true}>Column Type</Label>
                <Dropdown
                 selectedKey={this.state.columnType}
                 onChanged={this.onChangeColumnType}
                 options={[
                   {key: columnTypes.choice, text: textForType(columnTypes.choice)},
                   {key: columnTypes.datetime, text: textForType(columnTypes.datetime)},
                   {key: columnTypes.link, text: textForType(columnTypes.link)},
                   {key: columnTypes.lookup, text: textForType(columnTypes.lookup)},
                   {key: columnTypes.number, text: textForType(columnTypes.number)},
                   {key: columnTypes.person, text: textForType(columnTypes.person)},
                   {key: columnTypes.picture, text: textForType(columnTypes.picture)},
                   {key: columnTypes.text, text: textForType(columnTypes.text)},
                   {key: columnTypes.boolean, text: textForType(columnTypes.boolean)}
                 ]}/>
              </div>
              <ChoiceGroup
               disabled={this.state.columnType == undefined}
               selectedKey={this.state.useWizardForNew ? 'wizard' : 'blank'}
               onChange={this.onNewStartWithChanged}
               options={[
                 {key:'wizard', text:'Start with a template', onRenderField: (props, render) => {
                  return(
                    <div>
                      { render!(props) }
                      {this.wizardOptions()}
                    </div>
                  );
                 }},
                 {key:'blank', text:'Start from scratch'}
               ]}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text="Back" onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text="OK" disabled={!this.okButtonEnabled()}/>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.open && (
            <div>Open!</div>
          )}
        </div>
      </div>
    );
  }

  @autobind
  private gotoStage(stage:welcomeStage): void {
    this.setState({
      stage
    });
  }

  private okButtonEnabled(): boolean {
    switch(this.state.stage) {
      case welcomeStage.new:
        return (
          this.state.columnType !== undefined &&
          (!this.state.useWizardForNew || (this.state.useWizardForNew && this.state.ChoosenWizardName !== undefined))
        );
      default:
        return false;
    }
  }

  @autobind
  private onChangeColumnType(item: IDropdownOption): void {
    this.setState({
      columnType: +item.key,
      ChoosenWizardName: undefined //should be replaced with filter check (if still allowed, then don't unset)
      //Also set the useWizardOnNew to false if no wizards for type
    });
  }

  @autobind
	private onNewStartWithChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      useWizardForNew: option.key == 'wizard'
    });
	}

  private wizardOptions(): JSX.Element {
    //Temp - replaced by main const
    let Wizards: Array<IWizard> = [
      {name: 'Wizard 1', description: 'Wizard!', iconName:'Color', fieldTypes:[columnTypes.text, columnTypes.datetime]},
      {name: 'Data Bars', description: 'Adds horizontal bars to the field to visually express the value by length', iconName:'Mail', fieldTypes:[columnTypes.number]},
      {name: 'Wizard 3', description: 'Wizard!', iconName:'TextField', fieldTypes:[columnTypes.text]},
      {name: 'Wizard 4', description: 'Wizard!', iconName:'FangBody', fieldTypes:[columnTypes.text]},
      {name: 'Wizard 5', description: 'Wizard!', iconName:'Fingerprint', fieldTypes:[columnTypes.text]},
      {name: 'Wizard 6', description: 'Wizard!', iconName:'Pill', fieldTypes:[columnTypes.text,columnTypes.choice]},
      {name: 'Wizard 7', description: 'Wizard!', iconName:'Running', fieldTypes:[columnTypes.number, columnTypes.text]}
    ];

    let filteredWizards = Wizards.filter((value: IWizard, index:number) => {
      if(this.state.columnType !== undefined) {
        if(value.fieldTypes.length == 0 || value.fieldTypes.indexOf(this.state.columnType) >= 0) {
          return true;
        }
        return false;
      }
      return true;
    });

    let topRowItemCount:number = filteredWizards.length > 0 ? Math.ceil(filteredWizards.length/2) : 0;
    let choicesWidth:number = Math.max(topRowItemCount * 64 + topRowItemCount * 4, 204);

    return (
    <div className={styles.wizardChoiceSelection + (this.state.useWizardForNew && this.state.columnType !== undefined ? '' : ' ' + styles.disabled)}>
      <div className={styles.wizardChoices} style={{width: choicesWidth.toString() + 'px'}}>
        {filteredWizards.map((value:IWizard, index: number) => {
          return (
            <div
             className={styles.wizardChoiceBox + (this.state.useWizardForNew && this.state.ChoosenWizardName == value.name ? ' ' + styles.choosenWizard : '')}
             title={this.state.useWizardForNew ? value.description : ''}
             onClick={()=>{this.onWizardClick(value.name);}}>
              <Icon iconName={value.iconName}/>
              <span>{value.name}</span>
            </div>
          );
        })}
        {filteredWizards.length == 0 && (
          <span className={styles.noWizards}>No templates available for the choosen column type</span>
        )}
      </div>
    </div>
    );
  }

  @autobind
  private onWizardClick(wizardName:string){
    if(this.state.useWizardForNew){
      this.setState({
        ChoosenWizardName: wizardName
      });
    }
  }

}

function mapStateToProps(state: IApplicationState): IColumnFormatterWelcomeProps{
	return {

	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterWelcomeProps>): IColumnFormatterWelcomeProps{
	return {

	};
}

export const ColumnFormatterWelcome = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterWelcome_);