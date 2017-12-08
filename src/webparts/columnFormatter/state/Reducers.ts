import { IApplicationState, initialState } from "./State";
import { ActionTypes, typeKeys } from "./Actions";
import { clone } from '@microsoft/sp-lodash-subset';

export const dataReducer = (state:IApplicationState = initialState, action:ActionTypes): IApplicationState => {
	let newState:IApplicationState = clone(state);

	switch (action.type) {
		case typeKeys.UPDATE_DATA_ROW:
			newState.data.rows = [
				...newState.data.rows.slice(0,action.rowIndex),
				[
					...newState.data.rows[action.rowIndex].slice(0,action.colIndex),
					action.value,
					...newState.data.rows[action.rowIndex].slice(action.colIndex+1)],
				...newState.data.rows.slice(action.rowIndex+1)];
			return newState;
		default:
			return state;
	}
};