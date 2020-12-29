/* global local */
/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
export const postMessage = (message, origin = (local ? 'http://bilibilihelper.com:8000/' : 'https://bilibili-helper.github.io/')) => {
    window.postMessage(message, origin);
};

/**
 * 向助手发送message
 * @param command
 * @param data
 */
export const sendCommandToHelper = (command, data) => {
    postMessage({command, commend: command, data, from: 'website'});
};

export const fetchFromHelper = (type, fetchOptions) => {
    if (fetchOptions.type) throw('fetchOptions can not contain the param: type');
    sendCommandToHelper('fetch', {...fetchOptions, type});
};

export const getCookieFromHelper = (getOptions) => {
    sendCommandToHelper('cookie', getOptions);
};

export const htmlDecode = (all, input) => {
    const e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

export const cumulativeOffset = (element) => {
    let top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {top, left};
};

export const generateFeedList = (str) => {
    return JSON.stringify(str.split('\n').map(s => s.trim().split(/\s+/g)).map((data) => {
        return [
            data[0].replace(/-/g, '/'),
            data[12],
            +data[6],
            data[13].split('-')[1] || ''
        ].filter(Boolean)
    }))
}
