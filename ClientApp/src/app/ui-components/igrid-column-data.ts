// Data shared between column picker and grid to control which columns of grid are displayed
export interface IGridColumnData {
	htmlId: string;			// Id for ngContainer defining column in table; also used to match items when merging page component & cache data
	columnName: string;		// Name displayed to user in column Header
	displayed: boolean;		// column is displayed if True
}
