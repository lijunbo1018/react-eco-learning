export const ACTIONS = {
    SWITCH_LOCALE: 'SWITCH_LOCALE'
};

const switchLocale = locale => {
    return {
        type: ACTIONS.SWITCH_LOCALE,
        locale
    }
};

export const reloadLocale = locale => dispatch => {
    require(`bundle-loader!../../i18n/messages_${locale}`)(module => {
        window.localStorage.setItem('ICODE_LOCALE_PREFERENCE', locale);
        dispatch(switchLocale({
            locale,
            messages: module.default
        }))
    })
};