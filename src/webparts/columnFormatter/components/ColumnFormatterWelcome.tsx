import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, columnTypes } from '../state/State';
import { launchEditor } from '../state/Actions';
import { iconForType, textForType } from '../helpers/ColumnTypeHelpers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IWizard, Wizards, getWizardByName, getWizardsForColumnType } from './Wizards/WizardCommon';
import { select } from 'glamor';

export enum welcomeStage {
  start,
  new,
  open
}

export interface IColumnFormatterWelcomeProps {
  launchEditor?: (wizardName:string, colType:columnTypes) => void;
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
                <h1>{strings.WelcomeTitle}</h1>
                <span>{strings.WelcomeSubTitle}</span>
              </div>
              <div className={styles.startButtons}>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.new);}}>
                  <div className={styles.icon}>
                    <Icon iconName='Filters'/>
                  </div>
                  <div className={styles.words}>
                    <h2>{strings.WelcomeNewHeader}</h2>
                    <span>{strings.WelcomeNewDescription}</span>
                  </div>
                </div>
                <div className={styles.startButton} onClick={() => {this.gotoStage(welcomeStage.open);}}>
                  <div className={styles.icon}>
                    <Icon iconName='OpenFolderHorizontal'/>
                  </div>
                  <div className={styles.words}>
                    <h2>{strings.WelcomeOpenHeader}</h2>
                    <span>{strings.WelcomeOpenDescription}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.new && (
            <div className={styles.newForm}>
              <div className={styles.columnType}>
                <Label required={true}>{strings.WelcomeNewColumnTypeLabel}</Label>
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
                 {key:'wizard', text:strings.WelcomeNewWizardOption, onRenderField: (props, render) => {
                  return(
                    <div>
                      { render!(props) }
                      {this.wizardOptions()}
                    </div>
                  );
                 }},
                 {key:'blank', text:strings.WelcomeNewBlankOption}
               ]}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.WelcomeBackButton} onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.WelcomeOKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForNewClick}/>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.open && (
            <div>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.WelcomeBackButton} onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.WelcomeOKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForNewClick}/>
                </div>
              </div>
            </div>
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
    let selectedWizard: IWizard = getWizardByName(this.state.ChoosenWizardName);
    let wizardName:string = undefined;
    if(selectedWizard !== undefined && (selectedWizard.fieldTypes.length == 0 || selectedWizard.fieldTypes.indexOf(+item.key) >= 0)) {
      wizardName = selectedWizard.name;
    }
    this.setState({
      columnType: +item.key,
      ChoosenWizardName: wizardName,
      useWizardForNew: (getWizardsForColumnType(+item.key).length > 0 && this.state.useWizardForNew)
    });
  }

  @autobind
	private onNewStartWithChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      useWizardForNew: option.key == 'wizard'
    });
	}

  private wizardOptions(): JSX.Element {

    let filteredWizards = getWizardsForColumnType(this.state.columnType);

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
             onClick={()=>{this.onWizardClick(value.name);}}
             key={value.name}>
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

  @autobind
  private onOkForNewClick(): void {
    this.props.launchEditor(this.state.useWizardForNew ? this.state.ChoosenWizardName : undefined, this.state.columnType);
  }

}

function mapStateToProps(state: IApplicationState): IColumnFormatterWelcomeProps{
	return {

	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterWelcomeProps>): IColumnFormatterWelcomeProps{
	return {
    launchEditor: (wizardName:string, colType:columnTypes) => {
      dispatch(launchEditor(wizardName, colType));
    }
	};
}

export const ColumnFormatterWelcome = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterWelcome_);