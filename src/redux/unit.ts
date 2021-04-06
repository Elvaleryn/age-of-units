import axios from './api';
import { put, takeLatest } from "redux-saga/effects";
import { IUnit } from '../model/unit.model';
import { call } from 'typed-redux-saga';

export const actionTypes = {
    FETCH_UNITS: "FETCH_UNITS",
    FETCH_UNITS_SUCCESS: "FETCH_UNITS_SUCCESS",
    FETCH_UNIT: "FETCH_UNIT",
    FETCH_UNIT_SUCCESS: "FETCH_UNIT_SUCCESS",
    FILTER_UNITS_BY_AGE: "FILTER_UNITS_BY_AGE",
    FILTER_UNITS_BY_AGE_SUCCESS: "FILTER_UNITS_BY_AGE_SUCCESS",
    FILTER_UNITS_BY_COST: "FILTER_UNITS_BY_COST",
    FILTER_UNITS_BY_COST_SUCCESS: "FILTER_UNITS_BY_COST_SUCCESS",
    FILTER_UNITS_BY_COST_CHECKBOX: "FILTER_UNITS_BY_COST_CHECKBOX",
    FILTER_UNITS_BY_COST_CHECKBOX_SUCCESS: "FILTER_UNITS_BY_COST_CHECKBOX_SUCCESS",
    FILTER_UNITS_BY_APPLY_SUCCESS: "FILTER_UNITS_BY_APPLY_SUCCESS",
    FILTER_UNITS_BY_APPLY_SUCCESS_FROM_AGE: "FILTER_UNITS_BY_APPLY_SUCCESS_FROM_AGE"
};


//actions
export const actions = {
    fetchUnits: () => ({ type: actionTypes.FETCH_UNITS }),

    fetchUnitsSuccess: (units: any) => ({
        type: actionTypes.FETCH_UNITS_SUCCESS,
        payload: { units },
    }),

    fetchUnit: (id?: string | undefined) => ({ type: actionTypes.FETCH_UNIT, id: id }),

    fetchUnitSuccess: (units: any) => ({
        type: actionTypes.FETCH_UNIT_SUCCESS,
        payload: { units },
    }),

    filterByAge: (filter: any) => ({
        type: actionTypes.FILTER_UNITS_BY_AGE,
        ...filter
    }),

    filterByAgeSuccess: (filteredData: any) => ({
        type: actionTypes.FILTER_UNITS_BY_AGE_SUCCESS,
        payload: { filteredData }
    }),

    filterByCost: (filter: any) => ({
        type: actionTypes.FILTER_UNITS_BY_COST,
        ...filter
    }),

    filterByCostSuccess: (filteredData: any) => ({
        type: actionTypes.FILTER_UNITS_BY_COST_SUCCESS,
        payload: { filteredData }
    }),
    applyFilter: (filteredData: any) => ({
        type: actionTypes.FILTER_UNITS_BY_APPLY_SUCCESS,
        payload: { filteredData }
    }),

    filterByCostCheckbox: (filter: any) => ({
        type: actionTypes.FILTER_UNITS_BY_COST_CHECKBOX,
        ...filter
    }),

    filterByCostCheckboxSuccess: (filteredData: any) => ({
        type: actionTypes.FILTER_UNITS_BY_COST_CHECKBOX_SUCCESS,
        payload: { filteredData }
    })


}

const initialState = {
    units: [] as Array<IUnit>,
    filteredUnits: [] as Array<IUnit>,
    age: 'ALL',
    foodMinValue: 0,
    foodMaxValue: 0,
    woodMinValue: 0,
    woodMaxValue: 0,
    goldMinValue: 0,
    goldMaxValue: 0,
    enableCheckBoxes: { Food: false, Wood: false, Gold: false },
    loading: false,
    error: null,
};

export type UnitState = typeof initialState;

//reducer
export const UnitReducer = (state: UnitState = initialState, action: any): UnitState => {

    switch (action.type) {

        case actionTypes.FETCH_UNITS_SUCCESS:
            return {
                ...state,
                loading: false,
                units: action.payload.units,
                filteredUnits: action.payload.units
            };

        case actionTypes.FETCH_UNIT_SUCCESS:
            return {
                ...state,
                loading: false,
                units: action.payload.units
            };

        case actionTypes.FILTER_UNITS_BY_AGE_SUCCESS:

            return {
                ...state,
                loading: false,
                age: action.payload.filteredData.value,
            }

        case actionTypes.FILTER_UNITS_BY_APPLY_SUCCESS:
            console.log(state);
            const filtera = state.units.filter((item: any) =>
            (
                (
                    ((state.age !== null && state.age === item.age) || state.age === 'ALL') &&
                    (
                        ((state.enableCheckBoxes.Food && item.cost?.Food <= state.foodMaxValue && item.cost?.Food >= state.foodMinValue) || !state.enableCheckBoxes.Food) &&
                        ((state.enableCheckBoxes.Gold && item.cost?.Gold <= state.goldMaxValue && item.cost?.Gold >= state.goldMinValue) || !state.enableCheckBoxes.Gold) &&
                        ((state.enableCheckBoxes.Wood && item.cost?.Wood <= state.woodMaxValue && item.cost?.Wood >= state.woodMinValue) || !state.enableCheckBoxes.Wood)
                    )
                )
            ));
            return {
                ...state,
                loading: false,
                filteredUnits: filtera,
            }


        case actionTypes.FILTER_UNITS_BY_COST_SUCCESS:

            const firstValue = action.payload.filteredData.value[0];
            const secondValue = action.payload.filteredData.value[1];
            const check = state.enableCheckBoxes as any;

            return {
                ...state,
                loading: false,
                foodMinValue: check.Food ? firstValue : 0,
                foodMaxValue: check.Food ? secondValue : 0,
                woodMinValue: check.Wood ? firstValue : 0,
                woodMaxValue: check.Wood ? secondValue : 0,
                goldMinValue: check.Gold ? firstValue : 0,
                goldMaxValue: check.Gold ? secondValue : 0
            }

        case actionTypes.FILTER_UNITS_BY_COST_CHECKBOX_SUCCESS:
            return {
                ...state,
                loading: false,
                enableCheckBoxes: { ...action.payload.filteredData.checkboxStates },
            }


        default:
            return state;

    };

};



//redux saga 
export function* fetchAllUnits() {
    yield takeLatest(actionTypes.FETCH_UNITS, function* fetchUnits() {
        const units: Promise<IUnit> = yield* call(callUnitService, undefined);

        yield put(actions.fetchUnitsSuccess(units));
    });

    yield takeLatest(actionTypes.FETCH_UNIT, function* fetchUnit(action) {
        console.log(action);
        const unit: Promise<IUnit> = yield* call(callUnitService, action);

        yield put(actions.fetchUnitSuccess([unit]));
    });

    yield takeLatest(actionTypes.FILTER_UNITS_BY_AGE, function* filterByAge(filter) {

        yield put(actions.filterByAgeSuccess(filter));
        yield put(actions.applyFilter(filter));
    });

    yield takeLatest(actionTypes.FILTER_UNITS_BY_COST, function* filterByCost(filter) {

        yield put(actions.filterByCostSuccess(filter));
        yield put(actions.applyFilter(filter));
    });

    yield takeLatest(actionTypes.FILTER_UNITS_BY_COST_CHECKBOX, function* filterByCostCheckbox(filter) {

        yield put(actions.filterByCostCheckboxSuccess(filter));
        yield put(actions.applyFilter(filter));
    });
};



//axios call 
export const callUnitService = async (action: any | undefined) => {
    let path = '/units';
    console.log(action);
    if (action) {
        const id = action.id;
        path += '/' + id;
    }

    return axios.get(path).then(({ data }) => {
        return data;
    }).catch(function (error) {
        console.log(error)
    });

};
