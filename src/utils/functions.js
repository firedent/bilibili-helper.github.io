/* global local */
/**
 * Author: DrowsyFlesh
 * Create: 2019/2/28
 * Description:
 */
export const postMessage = (message, origin = (local ? 'http://localhost:8000/' : 'https://bilibili-helper.github.io/')) => {
    window.postMessage(message, origin);
};

/**
 * 向助手发送message
 * @param commend
 * @param data
 */
export const sendCommendToHelper = (commend, data) => {
    postMessage({commend, data, from: 'website'});
};

export const fetchFromHelper = (type, fetchOptions) => {
    if (fetchOptions.type) throw('fetchOptions can not contain the param: type');
    sendCommendToHelper('fetch', {...fetchOptions, type});
};

export const getCookieFromHelper = (getOptions) => {
    sendCommendToHelper('cookie', getOptions);
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
