const Buffer = require('buffer/').Buffer;

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en'
};

export const USER_ROLE = {
    ADMIN: 'R1',
    USER: 'R2'
}
export const icons = [<i className="bi bi-globe-americas"></i>, <i className="bi bi-person-heart"></i>, <i className="bi bi-lock-fill"></i>]
export const socialLink = { facebook: 'facebook', youtube: 'youtube', twitter: 'twitter' }
export const convertImage = (image) => {
    let base64String = ''
    if (image) {
        base64String = new Buffer(image, 'base64').toString('binary');
    }
    return base64String;
}

export const noAvatar = 'https://anubis.gr/wp-content/uploads/2018/03/no-avatar.png'

export const toAlias = (str) => {
    const alias = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return alias.replace(/[^a-z0-9]/g, '');
}
export const toSearchAlias = (str) => {
    const alias = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return alias.replace(/[^a-z0-9]/g, '_');
}


export const createClass = (list) => {
    let length = list.length;
    if (length === 1) {
        return 'one-item'
    } else if (length === 2) {
        return 'two-items'
    } else {
        return 'photo'
    }
}