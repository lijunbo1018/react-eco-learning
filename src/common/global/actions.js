export const ACTIONS = {
    SWITCH_LOCALE: 'SWITCH_LOCALE'
};

export const switchLocale = locale => {
    return {
        type: ACTIONS.SWITCH_LOCALE,
        locale
    }
};