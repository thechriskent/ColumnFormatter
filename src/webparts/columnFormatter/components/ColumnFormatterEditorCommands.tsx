import * as React from 'react';
import styles from './ColumnFormatter.module.scss';
import * as strings from 'ColumnFormatterWebPartStrings';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { chooseTheme, changeUIState, disconnectWizard } from '../state/Actions';
import { escape } from '@microsoft/sp-lodash-subset';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IApplicationState, editorThemes, uiState, IContext } from '../state/State';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import pnp from "sp-pnp-js";
var fileDownload = require('js-file-download');


export interface IColumnFormatterEditorCommandsProps {
  context?: IContext;
  changeUIState?: (state:uiState) => void;
  disconnectWizard?: () => void;
  wizardTabVisible?: boolean;
  theme?: editorThemes;
  chooseTheme?: (theme:editorThemes) => void;
  editorString?: string;
  fieldName?: string;
  viewTab?: number;
}

export interface IColumnFormatterEditorCommandsState {
  newConfirmationDialogVisible: boolean;
  customizeConfirmationDialogVisible: boolean;
  saveToLibraryDialogVisible: boolean;
  librariesLoaded: boolean;
  libraries: Array<any>;
  selectedLibraryUrl?: string;
  libraryFolderPath: string;
  libraryFileName: string;
  libraryIsSaving: boolean;
  librarySaveError?: string;
}

class ColumnFormatterEditorCommands_ extends React.Component<IColumnFormatterEditorCommandsProps, IColumnFormatterEditorCommandsState> {

  public constructor(props:IColumnFormatterEditorCommandsProps) {
    super(props);

    this.state = {
      newConfirmationDialogVisible: false,
      customizeConfirmationDialogVisible: false,
      saveToLibraryDialogVisible: false,
      librariesLoaded: false,
      libraries: new Array<any>(),
      libraryFolderPath: '',
      libraryFileName: props.fieldName + '.json',
      libraryIsSaving: false
    };
  }

  public render(): React.ReactElement<IColumnFormatterEditorCommandsProps> {
    return (
      <div>
        <CommandBar
          items={this.getCommandBarItems()}
          farItems={this.getCommandBarFarItems()}
        />
        <Dialog
         hidden={!this.state.newConfirmationDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.normal,
           title: strings.NewConfirmationDialogTitle,
           subText: strings.NewConfirmationDialogText
         }}>
         <DialogFooter>
           <PrimaryButton text={strings.NewConfirmationDialogConfirmButton} onClick={this.onNewConfirmationClick}/>
           <DefaultButton text={strings.NewConfirmationDialogCancelButton} onClick={this.closeDialog}/>
         </DialogFooter>
        </Dialog>
        <Dialog
         hidden={!this.state.customizeConfirmationDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.normal,
           title: strings.CustomizeConfirmationDialogTitle,
           subText: strings.CustomizeConfirmationDialogText
         }}>
         <DialogFooter>
           <PrimaryButton text={strings.CustomizeConfirmationDialogConfirmButton} onClick={this.onCustomizeConfirmationClick}/>
           <DefaultButton text={strings.CustomizeConfirmationDialogCancelButton} onClick={this.closeDialog}/>
         </DialogFooter>
        </Dialog>
        <Dialog
         hidden={!this.state.saveToLibraryDialogVisible}
         onDismiss={this.closeDialog}
         dialogContentProps={{
           type: DialogType.largeHeader,
           title: strings.SaveToLibraryDialogTitle
         }}>
          {!this.props.context.isOnline && (
            <span>This feature is not available from the local workbench</span>
          )}
          {!this.state.librariesLoaded && this.props.context.isOnline && !this.state.libraryIsSaving && this.state.librarySaveError == undefined && (
            <Spinner size={SpinnerSize.large} label='Loading Libraries...'/>
          )}
          {this.state.librariesLoaded && this.props.context.isOnline && !this.state.libraryIsSaving && this.state.librarySaveError == undefined && (
            <div>
              <Dropdown
               label='Local library'
               selectedKey={this.state.selectedLibraryUrl}
               onChanged={(item:IDropdownOption)=> {this.setState({selectedLibraryUrl: item.key.toString()});}}
               required={true}
               options={this.librariesToOptions()} />
              <TextField
               label='Folder Path (optional)'
               value={this.state.libraryFolderPath}
               onChanged={(value:string) => {this.setState({libraryFolderPath: value});}}/>
              <TextField
               label='Filename'
               required={true}
               value={this.state.libraryFileName}
               onChanged={(value:string) => {this.setState({libraryFileName: value});}}/>
            </div>
          )}
          {this.state.libraryIsSaving && this.state.librarySaveError == undefined &&(
            <Spinner size={SpinnerSize.large} label='Saving to Library...'/>
          )}
          {this.state.librarySaveError !== undefined && (
            <span className={styles.errorMessage}>{this.state.librarySaveError}</span>
          )}
          <DialogFooter>
            <PrimaryButton text={strings.SaveToLibraryDialogConfirmButton} disabled={!this.saveToLibrarySaveButtonEnabled()} onClick={this.onSaveToLibrarySaveButtonClick}/>
            <DefaultButton text={strings.SaveToLibraryDialogCancelButton} onClick={this.closeDialog}/>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private getCommandBarItems(): Array<IContextualMenuItem> {
    let items:Array<IContextualMenuItem> = [
      {
        key: 'new',
        name: strings.CommandNew,
        iconProps: {iconName: 'Add'},
        onClick: this.onNewClick
      }
    ];
    if(this.props.wizardTabVisible) {
      items.push({
        key: 'customize',
        name: strings.CommandCustomize,
        iconProps: {iconName: 'Fingerprint'},
        onClick: this.onCustomizeClick
      });
    }
    return items;
  }

  private getCommandBarFarItems(): Array<IContextualMenuItem> {
    let items:Array<IContextualMenuItem> = [];
    if(this.props.viewTab > 0) {
      items.push(
        {
          key: 'theme',
          name: strings.CommandEditor,
          iconProps: {iconName: 'Color'},
          subMenuProps: {
            items: [
              {
                key: 'vs',
                name: 'vs',
                canCheck: true,
                checked: this.props.theme == editorThemes.vs,
                onClick: this.onChooseTheme
              },
              {
                key: 'vsDark',
                name: 'vs-dark',
                canCheck: true,
                checked: this.props.theme == editorThemes.vsDark,
                onClick: this.onChooseTheme
              },
              {
                key: 'hcBlack',
                name: 'hc-black',
                canCheck: true,
                checked: this.props.theme == editorThemes.hcBlack,
                onClick: this.onChooseTheme
              }
            ]
          }
        }
      );
    }
    items.push(
        {
          key: 'saveas',
          name: strings.CommandSaveAs,
          iconProps: {iconName: 'SaveAs'},
          subMenuProps: {
            items: [
              {
                key: 'saveas-download',
                name: strings.CommandDownload,
                iconProps: { iconName: 'CloudDownload' },
                onClick: this.onDownloadClick
              },
              {
                key: 'saveas-copy',
                name: strings.CommandCopy,
                iconProps: { iconName: 'Copy' },
                onClick: this.onCopyClick
              },
              {
                key: 'saveas-library',
                name: strings.CommandSaveToLibrary,
                iconProps: { iconName: 'DocLibrary' },
                onClick: this.onSaveToLibraryClick
              },
              {
                key: 'saveas-listfield',
                name: strings.CommandApplyToList,
                iconProps: { iconName: 'Deploy' },
                onClick: this.onApplyToListClick
              }
            ]
          }
        }
    );
    return items;
  }

  @autobind
  private onNewClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.setState({
      newConfirmationDialogVisible: true
    });
  }

  @autobind
  private onNewConfirmationClick(): void {
    this.props.changeUIState(uiState.welcome);
  }

  @autobind
  private onCustomizeClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.setState({
      customizeConfirmationDialogVisible: true
    });
  }

  @autobind
  private onCustomizeConfirmationClick(): void {
    this.props.disconnectWizard();
    this.setState({
      customizeConfirmationDialogVisible: false
    });
  }

  @autobind
  private closeDialog(): void {
    this.setState({
      newConfirmationDialogVisible: false,
      customizeConfirmationDialogVisible: false,
      saveToLibraryDialogVisible: false,
      librarySaveError: undefined
    });
  }

  @autobind
  private onChooseTheme(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.props.chooseTheme(editorThemes[item.key]);
  }

  @autobind
  private onDownloadClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    fileDownload(this.props.editorString, this.props.fieldName + '.json');
  }

  @autobind
  private onCopyClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    var textArea = document.createElement("textarea");
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = this.props.editorString;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        var successful = document.execCommand('copy');
      } catch (err) {
        console.log('Unable to copy!');
      }
      document.body.removeChild(textArea);
  }

  @autobind
  private onSaveToLibraryClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    if(!this.state.librariesLoaded) {
      if(this.props.context.isOnline) {
        pnp.sp.site.getDocumentLibraries(this.props.context.webAbsoluteUrl)
          .then((data:any) => {
            this.setState({
              librariesLoaded: true,
              libraries: data
            });
          });
      }
    }
    this.setState({
      saveToLibraryDialogVisible: true
    });
  }

  private librariesToOptions(): Array<IDropdownOption> {
    let items:Array<IDropdownOption> = new Array<IDropdownOption>();
    for(var library of this.state.libraries) {
      items.push({
        key: library.ServerRelativeUrl,
        text: library.Title
      });
    }
    return items;
  }

  private saveToLibrarySaveButtonEnabled(): boolean{
    return (
      this.props.context.isOnline && this.state.selectedLibraryUrl !== undefined &&
        this.state.libraryFileName.length > 0 && this.state.librarySaveError == undefined
    );
  }

  @autobind
  private onSaveToLibrarySaveButtonClick(): void {
    this.setState({
      libraryIsSaving: true,
      librarySaveError: undefined
    });
    pnp.sp.web.getFolderByServerRelativeUrl(this.state.selectedLibraryUrl + (this.state.libraryFolderPath.length > 0 ? '/' + this.state.libraryFolderPath : ''))
      .files.add(this.state.libraryFileName, this.props.editorString, true)
      .then(()=>{
        this.setState({
          libraryIsSaving: false,
          saveToLibraryDialogVisible: false
        });
      })
      .catch((error:any) => {
        this.setState({
          libraryIsSaving: false,
          librarySaveError: 'Error while saving! Verify the folderpath is correct (if used) and that you have permission to save to this library. Technical Details: ' + error.message
        });
      });
  }

  @autobind
  private onApplyToListClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterEditorCommandsProps{
	return {
    context: state.context,
    wizardTabVisible: state.ui.tabs.wizardTabVisible,
    theme: state.code.theme,
    editorString: state.code.editorString,
    fieldName: state.data.columns[0].name,
    viewTab: state.ui.tabs.viewTab
	};
}

function mapDispatchToProps(dispatch: Dispatch<IColumnFormatterEditorCommandsProps>): IColumnFormatterEditorCommandsProps{
	return {
    changeUIState: (state:uiState) => {
      dispatch(changeUIState(state));
    },
    disconnectWizard: () => {
      dispatch(disconnectWizard());
    },
    chooseTheme: (theme:editorThemes) => {
      dispatch(chooseTheme(theme));
    }
	};
}

export const ColumnFormatterEditorCommands = connect(mapStateToProps, mapDispatchToProps)(ColumnFormatterEditorCommands_);