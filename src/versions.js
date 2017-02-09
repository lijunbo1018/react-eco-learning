const icode = {
    name: 'iCode',
    url: 'http://icode.baidu.com'
};

const enterprise = {
    name: '效率云',
    url: 'https://xiaolvyun.baidu.com'
};

const google = {
    name: 'Google',
    url: 'https://www.google.com.hk'
};

let conf;
switch (process.env.VERSION) {
    case 'enterprise':
        conf = enterprise;
        break;
    case 'google':
        conf = google;
        break;
    default:
        conf = icode;
        break;
}

export const version = conf;