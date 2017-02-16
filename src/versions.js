const baidu = {
    name: '百度',
    url: 'https://www.baidu.com'
};

const google = {
    name: 'Google',
    url: 'https://www.google.com'
};

const github = {
    name: 'Github',
    url: 'https://github.com'
};

let conf;
switch (process.env.VERSION) {
    case 'google':
        conf = google;
        break;
    case 'github':
        conf = github;
        break;
    default:
        conf = baidu;
        break;
}

export const version = conf;