declare interface IColumnFormatterWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  DeleteRow: string;
  AddRow: string;
  DeleteColumn: string;
  AddColumn: string;
}

declare module 'ColumnFormatterWebPartStrings' {
  const strings: IColumnFormatterWebPartStrings;
  export = strings;
}
