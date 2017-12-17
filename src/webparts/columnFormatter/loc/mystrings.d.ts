declare interface IColumnFormatterWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  WelcomeTitle: string;
  WelcomeSubTitle: string;
  WelcomeNewHeader: string;
  WelcomeNewDescription: string;
  WelcomeOpenHeader: string;
  WelcomeOpenDescription: string;
  WelcomeNewColumnTypeLabel: string;
  WelcomeNewWizardOption: string;
  WelcomeNewBlankOption: string;
  WelcomeBackButton: string;
  WelcomeOKButton: string;

  TabWizard: string;
  TabTree: string;
  TabData: string;
  TabPreview: string;
  TabCode: string;
  TabSplit: string;

  PanelHeaderData: string;
  PanelHeaderPreview: string;
  PanelHeaderCode: string;

  CommandNew: string;
  CommandCustomize: string;
  CommandEditor: string;
  
  NewConfirmationDialogTitle: string;
  NewConfirmationDialogText: string;
  NewConfirmationDialogConfirmButton: string;
  NewConfirmationDialogCancelButton: string;

  CustomizeConfirmationDialogTitle: string;
  CustomizeConfirmationDialogText: string;
  CustomizeConfirmationDialogConfirmButton:string;
  CustomizeConfirmationDialogCancelButton: string;

  DeleteRow: string;
  AddRow: string;
  DeleteColumn: string;
  AddColumn: string;
  
  ColumnNameChangeTooltip: string;
  ColumnTypeHeadline: string;
  ColumnTypeMessage: string;
  ColumnTypeChangeTooltip: string;

  ColumnTypeBoolean: string;
  ColumnTypeChoice: string;
  ColumnTypeDateTime: string;
  ColumnTypeLink: string;
  ColumnTypePicture: string;
  ColumnTypeLookup: string;
  ColumnTypeNumber: string;
  ColumnTypePerson: string;
  ColumnTypeText: string;
  ColumnTypeUnknown: string;

  BoolValueStringTrue: string;
  BoolValueStringFalse: string;

  SubPropertiesHeadline: string;
  TimeHeadline: string;

  Month1: string;
  Month2: string;
  Month3: string;
  Month4: string;
  Month5: string;
  Month6: string;
  Month7: string;
  Month8: string;
  Month9: string;
  Month10: string;
  Month11: string;
  Month12: string;
  Month1Short: string;
  Month2Short: string;
  Month3Short: string;
  Month4Short: string;
  Month5Short: string;
  Month6Short: string;
  Month7Short: string;
  Month8Short: string;
  Month9Short: string;
  Month10Short: string;
  Month11Short: string;
  Month12Short: string;
  Day1: string;
  Day2: string;
  Day3: string;
  Day4: string;
  Day5: string;
  Day6: string;
  Day7: string;
  Day1Short: string;
  Day2Short: string;
  Day3Short: string;
  Day4Short: string;
  Day5Short: string;
  Day6Short: string;
  Day7Short: string;
  DTgoToToday: string;
  DTprevMonthAriaLabel: string;
  DTnextMonthAriaLabel: string;
  DTprevYearAriaLabel: string;
  DTnextYearAriaLabel: string;
  HourLabel: string;
  MinuteLabel: string;
  SecondsLabel: string;

  CFSariaError: string;
  CFSelmTypeInvalid: string;
  CFSelmTypeMissing: string;
  CFSinvalidProtocol: string;
  CFSinvalidStyleAttribute: string;
  CFSinvalidStyleValue: string;
  CFSnan: string;
  CFSoperandMissing: string;
  CFSoperandNOnly: string;
  CFSoperatorInvalid: string;
  CFSoperatorMissing: string;
  CFSunsupportedType: string;
  CFSuserFieldError: string;

  PreviewValidationGood: string;
  PreviewValidationBad: string;
}

declare module 'ColumnFormatterWebPartStrings' {
  const strings: IColumnFormatterWebPartStrings;
  export = strings;
}