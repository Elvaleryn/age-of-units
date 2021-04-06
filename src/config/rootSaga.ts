import { all } from "redux-saga/effects";

import * as unit from '../redux/unit'

export function* rootSaga() {
    yield all([unit.fetchAllUnits()]);
}
