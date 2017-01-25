const icode = {
    name: 'iCode',
    url: 'http://icode.baidu.com'
};

const xiaolvyun = {
    name: '效率云',
    url: 'https://xiaolvyun.baidu.com'
};

let conf;
switch (process.env.VERSION) {
    case 'xiaolvyun':
        conf = xiaolvyun;
        break;
    default:
        conf = icode;
        break;
}

export const version = conf;