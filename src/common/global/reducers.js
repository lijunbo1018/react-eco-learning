import { ACTIONS } from './actions'

export const locale = (state = 'zh-CN', action = void 0) => {
    switch (action.type) {
        case ACTIONS.SWITCH_LOCALE:
            return action.locale;
        default:
            return state
    }
};
