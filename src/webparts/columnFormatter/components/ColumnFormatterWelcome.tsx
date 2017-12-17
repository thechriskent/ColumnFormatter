import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, columnTypes } from '../state/State';
import { launchEditor, launchEditorWithCode } from '../state/Actions';
import { iconForType, textForType } from '../helpers/ColumnTypeHelpers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IWizard, Wizards, getWizardByName, getWizardsForColumnType } from './Wizards/WizardCommon';
import { select } from 'glamor';
import { FileUploader } from './FileUploader';

export enum welcomeStage {
  start,
  new,
  open,
  upload
}

export interface IColumnFormatterWelcomeProps {
  launchEditor?: (wizardName:string, colType:columnTypes) => void;
  launchEditorWithCode?: (wizardName:string, colType:columnTypes, editorString:string, validationErrors:Array<string>) => void;
}

export interface IColumnFormatterWelcomeState {
  stage: welcomeStage;
  columnTypeForNew?: columnTypes;
  useWizardForNew: boolean;
  ChoosenWizardName?: string;
  loadChoiceForOpen?: string;
  columnTypeForOpen?: columnTypes;
  fileChoiceForOpen?: string;
}

class ColumnFormatterWelcome_ extends React.Component<IColumnFormatterWelcomeProps, IColumnFormatterWelcomeState> {

  constructor(props:IColumnFormatterWelcomeProps) {
    super(props);

    this.state = {
      stage: welcomeStage.start,
      useWizardForNew: true
    };
  }

  public render(): React.ReactElement<IColumnFormatterWelcomeProps> {

    //TEMP
    //this.props.launchEditor(undefined,columnTypes.text);
    this.props.launchEditor('Data Bars', columnTypes.number);

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
                 selectedKey={this.state.columnTypeForNew}
                 onChanged={this.onChangeColumnTypeForNew}
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
               disabled={this.state.columnTypeForNew == undefined}
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
            <div className={styles.openForm}>
              <ChoiceGroup
               selectedKey={this.state.loadChoiceForOpen}
               onChange={this.onLoadChoiceForOpenChanged}
               options={[
                {key:'list', text: strings.WelcomeOpenLoadList},
                {key:'file', text: strings.WelcomeOpenLoadFile, onRenderField: (props, render) => {
                  return (
                    <div>
                      { render!(props) }
                      <div className={styles.columnType}>
                        <Label required={true}>{strings.WelcomeOpenColumnTypeLabel}</Label>
                        <Dropdown
                         selectedKey={this.state.columnTypeForOpen}
                         onChanged={this.onChangeColumnTypeForOpen}
                         disabled={this.state.loadChoiceForOpen !== 'file'}
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
                      <div className={styles.subChoice}>
                        <ChoiceGroup
                         selectedKey={this.state.fileChoiceForOpen}
                         onChange={this.onFileChoiceForOpenChanged}
                         disabled={this.state.loadChoiceForOpen !== 'file'}
                         options={[
                           {key:'library', text: strings.WelcomeOpenLoadFileLibrary},
                           {key:'upload', text: strings.WelcomeOpenLoadFileUpload}
                         ]}/>
                      </div>
                    </div>
                   );
                 }}
               ]}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.WelcomeBackButton} onClick={() => {this.gotoStage(welcomeStage.start);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.WelcomeNextButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForOpenClick}/>
                </div>
              </div>
            </div>
          )}
          {this.state.stage == welcomeStage.upload && (
            <div>
              <FileUploader onTextLoaded={this.onFileTextReceived}/>
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.WelcomeBackButton} onClick={() => {this.gotoStage(welcomeStage.open);}}/>
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
          this.state.columnTypeForNew !== undefined &&
          (!this.state.useWizardForNew || (this.state.useWizardForNew && this.state.ChoosenWizardName !== undefined))
        );
      case welcomeStage.open:
        return (
          this.state.loadChoiceForOpen == 'list' ||
          (this.state.loadChoiceForOpen == 'file' && this.state.columnTypeForOpen !== undefined && this.state.fileChoiceForOpen !== undefined)
        );
      default:
        return false;
    }
  }

  @autobind
  private onChangeColumnTypeForNew(item: IDropdownOption): void {
    let selectedWizard: IWizard = getWizardByName(this.state.ChoosenWizardName);
    let wizardName:string = undefined;
    if(selectedWizard !== undefined && (selectedWizard.fieldTypes.length == 0 || selectedWizard.fieldTypes.indexOf(+item.key) >= 0)) {
      wizardName = selectedWizard.name;
    }
    this.setState({
      columnTypeForNew: +item.key,
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

    let filteredWizards = getWizardsForColumnType(this.state.columnTypeForNew);

    let topRowItemCount:number = filteredWizards.length > 0 ? Math.ceil(filteredWizards.length/2) : 0;
    let choicesWidth:number = Math.max(topRowItemCount * 64 + topRowItemCount * 4, 204);

    return (
    <div className={styles.wizardChoiceSelection + (this.state.useWizardForNew && this.state.columnTypeForNew !== undefined ? '' : ' ' + styles.disabled)}>
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
    this.props.launchEditor(this.state.useWizardForNew ? this.state.ChoosenWizardName : undefined, this.state.columnTypeForNew);
  }


  @autobind
	private onLoadChoiceForOpenChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      loadChoiceForOpen: option.key
    });
	}

  @autobind
  private onChangeColumnTypeForOpen(item: IDropdownOption): void {
    this.setState({
      columnTypeForOpen: +item.key
    });
  }

  @autobind
	private onFileChoiceForOpenChanged(ev: React.FormEvent<HTMLInputElement>, option: any) {
    this.setState({
      fileChoiceForOpen: option.key
    });
	}

  @autobind
  private onOkForOpenClick(): void {
    if(this.state.loadChoiceForOpen == 'list'){

    } else {
      if(this.state.fileChoiceForOpen == 'library'){

      } else {
        this.gotoStage(welcomeStage.upload);
      }
    }
  }

  @autobind
	private onFileTextReceived(fileText:string) {
    //TODO: Check for wizard details in file
    let validationErrors:Array<string> = new Array<string>();
    try {
      let curObj:any = JSON.parse(fileText);
    } catch (e) {
      validationErrors.push(e.message);
    }
    this.props.launchEditorWithCode(undefined, this.state.columnTypeForOpen || columnTypes.text, fileText, validationErrors);
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
    },
    launchEditorWithCode: (wizardName:string, colType:columnTypes, editorString:string, validationErrors:Array<string>) => {
      dispatch(launchEditorWithCode(wizardName, colType, editorString, validationErrors));
    }
	};
}

export const ColumnFormatterWelcome = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterWelcome_);