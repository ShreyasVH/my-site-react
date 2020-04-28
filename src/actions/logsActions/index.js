import { LOGS_EVENTS } from '../../constants/events';

export const updateLogs = payload => ({
    type: LOGS_EVENTS.UPDATE_LOGS,
    payload
});