import { combineReducers } from "redux";

import * as unit  from '../redux/unit';

export interface IRootState {
 readonly unit:unit.UnitState;
}

export const rootReducer = combineReducers<IRootState>({
    unit: unit.UnitReducer
  });




