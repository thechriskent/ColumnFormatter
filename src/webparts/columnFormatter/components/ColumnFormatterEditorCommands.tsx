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
import { IApplicationState, editorThemes, uiState } from '../state/State';
var fileDownload = require('js-file-download');


export interface IColumnFormatterEditorCommandsProps {
  changeUIState?: (state:uiState) => void;
  disconnectWizard?: () => void;
  wizardTabVisible?: boolean;
  theme?: editorThemes;
  chooseTheme?: (theme:editorThemes) => void;
}

export interface IColumnFormatterEditorCommandsState {
  newConfirmationDialogVisible: boolean;
  customizeConfirmationDialogVisible: boolean;
}

class ColumnFormatterEditorCommands_ extends React.Component<IColumnFormatterEditorCommandsProps, IColumnFormatterEditorCommandsState> {

  public constructor(props:IColumnFormatterEditorCommandsProps) {
    super(props);

    this.state = {
      newConfirmationDialogVisible: false,
      customizeConfirmationDialogVisible: false
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
    let items:Array<IContextualMenuItem> = [
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
        },
        {
          key: 'saveas',
          name: strings.CommandSaveAs,
          iconProps: {iconName: 'SaveAs'},
          subMenuProps: {
            items: [
              {
                key: 'saveas-download',
                name: strings.CommandDownload,
                iconProps: { iconName: 'CloudDownload'},
                onClick: this.onDownloadClick
              }
            ]
          }
        }
    ];
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
      customizeConfirmationDialogVisible: false
    });
  }

  @autobind
  private onChooseTheme(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    this.props.chooseTheme(editorThemes[item.key]);
  }

  @autobind
  private onDownloadClick(ev?:React.MouseEvent<HTMLElement>, item?:IContextualMenuItem): void {
    fileDownload('some text','MyField.json');
  }
}

function mapStateToProps(state: IApplicationState): IColumnFormatterEditorCommandsProps{
	return {
    wizardTabVisible: state.ui.tabs.wizardTabVisible,
		theme: state.code.theme
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