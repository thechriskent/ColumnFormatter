declare interface IColumnFormatterWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  TabWizard: string;
  TabTree: string;
  TabData: string;
  TabPreview: string;
  TabCode: string;
  TabSplit: string;

  DeleteRow: string;
  AddRow: string;
  DeleteColumn: string;
  AddColumn: string;
  
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
}

declare module 'ColumnFormatterWebPartStrings' {
  const strings: IColumnFormatterWebPartStrings;
  export = strings;
}