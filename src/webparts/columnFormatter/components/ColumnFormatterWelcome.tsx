import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, columnTypes, IContext } from '../state/State';
import { launchEditor, launchEditorWithCode } from '../state/Actions';
import { iconForType, typeForTypeAsString, textForType } from '../helpers/ColumnTypeHelpers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IWizard, Wizards, getWizardByName, getWizardsForColumnType, standardWizardStartingCode } from './Wizards/WizardCommon';
import { select } from 'glamor';
import { FileUploader } from './FileUploader';
import pnp from "sp-pnp-js";

export enum welcomeStage {
  start,
  new,
  open,
  upload,
  loadFromList
}

export interface IColumnFormatterWelcomeProps {
  context?: IContext;
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
  listsLoaded: boolean;
  lists: Array<any>;
  selectedList?: string;
  selectedField?: string;
  loadingFromList: boolean;
  loadFromListError?: string;
}

class ColumnFormatterWelcome_ extends React.Component<IColumnFormatterWelcomeProps, IColumnFormatterWelcomeState> {

  constructor(props:IColumnFormatterWelcomeProps) {
    super(props);

    this.state = {
      stage: welcomeStage.start,
      useWizardForNew: true,
      listsLoaded: false,
      lists: new Array<any>(),
      loadingFromList: false
    };
  }

  public render(): React.ReactElement<IColumnFormatterWelcomeProps> {

    //TEMP
    //this.props.launchEditor(undefined,columnTypes.text);
    //this.props.launchEditor('Data Bars', columnTypes.number);

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
          {this.state.stage == welcomeStage.loadFromList && (
            <div>
              {!this.props.context.isOnline && (
                <span>This feature is not available from the local workbench</span>
              )}
              {!this.state.listsLoaded && this.props.context.isOnline && !this.state.loadingFromList && this.state.loadFromListError == undefined && (
                <Spinner size={SpinnerSize.large} label='Loading Lists...'/>
              )}
              {this.state.listsLoaded && this.props.context.isOnline && !this.state.loadingFromList && this.state.loadFromListError == undefined && (
                <div>
                  <Dropdown
                  label={strings.LocalListDropdownTitle}
                  selectedKey={this.state.selectedList}
                  onChanged={(item:IDropdownOption)=> {this.setState({selectedList: item.key.toString(),selectedField: undefined});}}
                  required={true}
                  options={this.listsToOptions()} />
                  <Dropdown
                  label={strings.LocalListFieldTitle}
                  selectedKey={this.state.selectedField}
                  disabled={this.state.selectedList == undefined}
                  onChanged={(item:IDropdownOption)=> {this.setState({selectedField: item.key.toString()});}}
                  required={true}
                  options={this.fieldsToOptions()} />
                </div>
              )}
              {this.state.loadingFromList && this.state.loadFromListError == undefined &&(
                <Spinner size={SpinnerSize.large} label='Loading from list...'/>
              )}
              {this.state.loadFromListError !== undefined && (
                <span className={styles.errorMessage}>{this.state.loadFromListError}</span>
              )}
              <div className={styles.navigationButtons}>
                <div>
                  <DefaultButton text={strings.WelcomeBackButton} onClick={() => {this.gotoStage(welcomeStage.open);}}/>
                </div>
                <div style={{textAlign: 'right'}}>
                  <PrimaryButton text={strings.WelcomeOKButton} disabled={!this.okButtonEnabled()} onClick={this.onOkForLoadFromListClick}/>
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
      case welcomeStage.loadFromList:
        return (
          this.props.context.isOnline && this.state.selectedList !== undefined &&
            this.state.selectedField !== undefined && this.state.loadFromListError == undefined
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
      this.gotoLoadFromList();
    } else {
      if(this.state.fileChoiceForOpen == 'library'){

      } else {
        this.gotoStage(welcomeStage.upload);
      }
    }
  }

  @autobind
	private onFileTextReceived(fileText:string) {
    this.launchEditorFromText(fileText, this.state.columnTypeForOpen || columnTypes.text);
  }

  private launchEditorFromText(text:string, type:columnTypes): void {
    if(text == undefined || text.length == 0) {
      text = standardWizardStartingCode(type);
    }
    //TODO: Check for wizard details in file
    let validationErrors:Array<string> = new Array<string>();
    try {
      let curObj:any = JSON.parse(text);
    } catch (e) {
      validationErrors.push(e.message);
    }
    this.props.launchEditorWithCode(undefined, type, text, validationErrors);
  }

  private gotoLoadFromList(): void {
    if(!this.state.listsLoaded) {
      if(this.props.context.isOnline) {
        pnp.sp.web.lists.filter('Hidden eq false').select('Id','Title','Fields/InternalName','Fields/TypeAsString','Fields/Hidden','Fields/Title','Fields/DisplayFormat').expand('Fields').get()
          .then((data:any) => {
            let listdata:Array<any> = new Array<any>();
            for(var i=0; i<data.length; i++){
              listdata.push({
                Id: data[i].Id,
                Title: data[i].Title,
                Fields: data[i].Fields.map((field:any, index:number) => {
                  if(!field.Hidden) {
                    let ftype = typeForTypeAsString(field.TypeAsString, field.DisplayFormat);
                    if(ftype !== undefined) {
                      return {
                        Title: field.Title,
                        InternalName: field.InternalName,
                        Type: ftype
                      };
                    }
                  }
                }).filter((field:any, index:number) => {return field !== undefined;})
              });
            }

            this.setState({
              listsLoaded: true,
              lists: listdata
            });
          })
          .catch((error:any) => {
            this.setState({
              loadFromListError: 'Error while loading lists! Technical Details: ' + error.message
            });
          });
      }
    }
    this.gotoStage(welcomeStage.loadFromList);
  }

  private listsToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var list of this.state.lists) {
      items.push({
        key: list.Id,
        text: list.Title
      });
    }
    return items;
  }

  private fieldsToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var list of this.state.lists) {
      if(list.Id == this.state.selectedList) {
        for(var field of list.Fields) {
          items.push({
            key: field.InternalName,
            text: field.Title + ' [' + textForType(field.Type) + ']'
          });
        }
        break;
      }
    }
    return items;
  }

  @autobind
  private onOkForLoadFromListClick(): void {
    this.setState({
      loadingFromList: true,
      loadFromListError: undefined
    });
    pnp.sp.web.lists.getById(this.state.selectedList)
      .fields.getByInternalNameOrTitle(this.state.selectedField).select('CustomFormatter','TypeAsString','DisplayFormat').get()
      .then((data)=>{
        this.launchEditorFromText(data.CustomFormatter, typeForTypeAsString(data.TypeAsString, data.DisplayFormat));
        this.setState({
          loadingFromList: false,
        });
      })
      .catch((error:any) => {
        this.setState({
          loadingFromList: false,
          loadFromListError: 'Error while loading! Technical Details: ' + error.message
        });
      });
  }

}

function mapStateToProps(state: IApplicationState): IColumnFormatterWelcomeProps{
	return {
    context: state.context,
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
