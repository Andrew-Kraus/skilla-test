import { call, put, takeEvery } from 'redux-saga/effects';
import { apiService } from '../api/index';
import { fetchCallsStart, fetchCallsSuccess, fetchCallsFailure } from '../store/callsSlice';
import { ICall } from '../interfaces/interfaces';

interface ICallData {
  results: ICall[]
}

function* fetchCallsSaga(action: ReturnType<typeof fetchCallsStart>): Generator<unknown, void, ICallData> {
  try {
    const data: ICallData = yield call(
      apiService.getCallList.bind(apiService),
      action.payload.dateStart,
      action.payload.dateEnd
    );

    yield put(fetchCallsSuccess(data.results));
    console.log(data.results)
  } catch (error: any) {
    yield put(fetchCallsFailure(error.message));
  }
}

export function* callsSaga() {
  yield takeEvery(fetchCallsStart.type, fetchCallsSaga);
}
