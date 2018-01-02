define([], function() {
  return {
    //Property Pane
    PropertyBasicGroupName: "Properties",
    PropertyHeightLabel: "Height",

    //Welcome
    WelcomeTitle: 'Column Formatter',
    WelcomeSubTitle: 'Easy editor for modern listview Column Formatting',
    WelcomeNewHeader: 'New',
    WelcomeNewDescription: 'Start with a blank canvas or choose from a template',
    WelcomeOpenHeader: 'Open',
    WelcomeOpenDescription: 'Load from a library or pull from a local list',
    WelcomeNewColumnTypeLabel: 'Column Type',
    WelcomeNewWizardOption: 'Start with a template',
    WelcomeNewBlankOption: 'Start from scratch',
    WelcomeBackButton: 'Back',
    WelcomeOKButton: 'OK',
    WelcomeNextButton: 'Next',
    WelcomeOpenLoadList: 'Load from a local list',
    WelcomeOpenLoadFile: 'Load from a file:',
    WelcomeOpenColumnTypeLabel: 'Column Type',
    WelcomeOpenLoadFileLibrary: 'Open a file from a local library',
    WelcomeOpenLoadFileUpload: 'Upload a file',

    //Tab Names
    TabWizard: "Wizard",
    TabTree: "Tree",
    TabData: "Data",
    TabPreview: "Preview",
    TabCode: "Code",
    TabSplit: "Side by Side",

    //Panel Headers
    PanelHeaderData: "Test Values",
    PanelHeaderPreview: "Preview",
    PanelHeaderCode: "Code Editor",

    //Editor CommandBar
    CommandNew: 'New',
    CommandCustomize: 'Customize',
    CommandEditor: 'Theme',
    CommandSaveAs: 'Save As',
    CommandDownload: 'Download',
    CommandCopy: 'Copy to clipboard',
    CommandSaveToLibrary: 'Save to local library',
    CommandApplyToList: 'Apply to local list field',

    //New Confirmation Dialog
    NewConfirmationDialogTitle: 'Start Fresh?',
    NewConfirmationDialogText: 'Any unsaved changes will be lost. Do you want to continue?',
    NewConfirmationDialogConfirmButton: 'Yes',
    NewConfirmationDialogCancelButton: 'Cancel',

    //Customize Confirmation Dialog
    CustomizeConfirmationDialogTitle: 'Remove Wizard?',
    CustomizeConfirmationDialogText: 'You will be able to edit the code directly, but the wizard pane will no longer be available. This is for advanced users. Are you sure?',
    CustomizeConfirmationDialogConfirmButton: 'Yes',
    CustomizeConfirmationDialogCancelButton: 'Cancel',

    //Save To Library Dialog
    SaveToLibraryDialogTitle: 'Save to local library',
    SaveToLibraryDialogConfirmButton: 'Save',
    SaveToLibraryDialogCancelButton: 'Cancel',

    //Apply To List Dialog
    ApplyToListDialogTitle: 'Apply to local list field',
    ApplyToListDialogConfirmButton: 'Save',
    ApplyToListDialogCancelButton: 'Cancel',

    //Data Column/Row buttons
    DeleteRow: "Delete Row",
    AddRow: "Add Row",
    DeleteColumn: "Delete Field",
    AddColumn: "Add Field",

    //Data Column Editing
    ColumnNameChangeTooltip: "Internal field name",
    ColumnTypeHeadline: "Column Type",
    ColumnTypeMessage: "Changing the type will also reset the values",
    ColumnTypeChangeTooltip: "Click to change",
    SubPropertiesHeadline: "Sub Properties",
    TimeHeadline: "Time",

    //Column Type Names
    ColumnTypeBoolean: "Yes/No",
    ColumnTypeChoice: "Choice",
    ColumnTypeDateTime: "Date/Time",
    ColumnTypeLink: "Hyperlink",
    ColumnTypePicture: "Picture",
    ColumnTypeLookup: "Lookup",
    ColumnTypeNumber: "Number",
    ColumnTypePerson: "Person",
    ColumnTypeText: "Text",
    ColumnTypeUnknown: "Unknown",

    //Boolean Values
    BoolValueStringTrue: "Yes",
    BoolValueStringFalse: "No",

    //DateTime Editor Strings
    Month1: "January",
    Month2: "February",
    Month3: "March",
    Month4: "April",
    Month5: "May",
    Month6: "June",
    Month7: "July",
    Month8: "August",
    Month9: "September",
    Month10: "October",
    Month11: "November",
    Month12: "December",
    Month1Short: "Jan",
    Month2Short: "Feb",
    Month3Short: "Mar",
    Month4Short: "Apr",
    Month5Short: "May",
    Month6Short: "Jun",
    Month7Short: "Jul",
    Month8Short: "Aug",
    Month9Short: "Sep",
    Month10Short: "Oct",
    Month11Short: "Nov",
    Month12Short: "Dec",
    Day1: "Sunday",
    Day2: "Monday",
    Day3: "Tuesday",
    Day4: "Wednesday",
    Day5: "Thursday",
    Day6: "Friday",
    Day7: "Saturday",
    Day1Short: "S",
    Day2Short: "M",
    Day3Short: "T",
    Day4Short: "W",
    Day5Short: "T",
    Day6Short: "F",
    Day7Short: "S",
    DTgoToToday: "Go to today",
    DTprevMonthAriaLabel: "Go to previous month",
    DTnextMonthAriaLabel: "Go to next month",
    DTprevYearAriaLabel: "Go to previous year",
    DTnextYearAriaLabel: "Go to next year",
    HourLabel: "Hour",
    MinuteLabel: "Minute",
    SecondsLabel: "Seconds",

    //Custom Formatting Error Strings
    CFSariaError: "No aria- tags found. As such, the field will not be accessible via a screen reader.",
    CFSelmTypeInvalid: "Invalid elmType: {0}. Must be one of {1}.",
    CFSelmTypeMissing: "Must specify elmType.",
    CFSinvalidProtocol: "A URL was blocked. Only http, https and mailto protocols are allowed.",
    CFSinvalidStyleAttribute: "'{0}' is not a supported style attribute.",
    CFSinvalidStyleValue: "The style values '{0}' contains one or more of the following disallowed characters ( : & ; ! .",
    CFSnan: "{0} is not a number. Number expected in the expression {1}.",
    CFSoperandMissing: "There must be at least 1 operand in the expression {0}.",
    CFSoperandNOnly: "Expecting {0} operand(s) for the expression {1}.",
    CFSoperatorInvalid: "'{0}' is not a valid operator. It must be one of {1} in the expression {2}.",
    CFSoperatorMissing: "Missing operator in expression: {0}.",
    CFSunsupportedType: "The type of field {0} is unsupported at this time.",
    CFSuserFieldError: "The field '{0}' is of type 'User', and can't be used directly because it has sub-properties. You need to specify which sub-property you want to use. e.g. [$AssignedTo.email]",

    //Format Validation Messages
    PreviewValidationGood: 'Validation Passed!',
    PreviewValidationBad: 'Invalid JSON (Code):',

    //Wizard Data Bars
    WizardDataBarsEmptyBarLabel: 'Low:',
    WizardDataBarsEmptyBarTooltip: 'The lowest value on the scale\nValues equal or lower than this will be shown as 0% full',
    WizardDataBarsFullBarLabel: 'High:',
    WizardDataBarsFullBarTooltip: 'The highest value on the scale\nValues equal or higher than this will be shown as 100% full',
    WizardDataBarsRangeGroupLabel: 'Range',
    WizardDataBarsValueDisplayGroupLabel: 'Value Display',
    WizardDataBarsValueDisplayActual: 'Show Actual Value',
    WizardDataBarsValueDisplayPercentage: 'Show Percentage',
    WizardDataBarsValueDisplayNone: 'None'
  }
});