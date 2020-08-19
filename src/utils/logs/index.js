import store from "../../store";
import ApiHelper from "../apiHelper";
import {BASE_URL_LOGGER, GET_LOGS} from "../../constants";
import {updateLogs} from "../../actions/logsActions";
import Context from "../context";
import Utils from '../';

export default class Logs
{
    static getLogs(shouldReplace = true)
    {
        let logsStore = Utils.copyObject(store.getState().logs);

        let url = BASE_URL_LOGGER + GET_LOGS;
        const count = 20;

        let offset;
        if (shouldReplace) {
            offset = 0;
        } else {
            offset = logsStore.offset;
        }

        let promise = ApiHelper.post(url, {
            offset,
            count
        });
        promise.then(apiResponse => {
           let response = apiResponse.data;

           logsStore.offset = (logsStore.offset + count);
           logsStore.hasReachedEnd = (response.length < count);

           let updatedLogs = response;
           if(!shouldReplace) {
               updatedLogs = logsStore.logs.concat(response);
           }

           logsStore.logs = updatedLogs;

            store.dispatch(updateLogs(logsStore));
            Context.hideLoader();

        }).catch(apiResponse => {
            Context.hideLoader();
        });
    }
}