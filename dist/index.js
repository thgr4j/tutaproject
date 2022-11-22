"use strict";
function pMsg(msg, valid) {
    const p = document.getElementById('ctrlMsg');
    p.textContent = msg;
    if (valid)
        p.style.color = 'green';
    else
        p.style.color = 'red';
}
function domValid(domain) {
    const domregex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const ipregex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    if (domain.slice(0, 9) == 'localhost' || domregex.test(domain.toLowerCase()) || ipregex.test(domain))
        return true;
    else
        return false;
}
var timeout = 0;
function check() {
    const input = document.getElementById('urlCheck');
    clearTimeout(timeout);
    var domain = input.value;
    if (domValid(domain)) {
        pMsg('The domain name is valid.', true);
        timeout = setTimeout(() => {
            srvCheck(domain);
        }, 2000);
    }
    else
        pMsg('The domain name is invalid.', false);
}
const db = [
    { "id": 1, "url": "github.com", "type": "file" },
    { "id": 2, "url": "google.de", "type": "file" },
    { "id": 3, "url": "localhost/img", "type": "directory" },
    { "id": 4, "url": "images.unsplash.com/photo-1669072084414-f10a0c2108bd", "type": "file" }
];
const type = (domain) => {
    for (const entry of db) {
        if (entry.url === domain)
            return entry.type;
    }
    return null;
};
function srvCheck(domain) {
    var msg = 'The domain name is valid.\n';
    if (type(domain) !== null)
        msg += 'Type: ' + type(domain);
    else
        msg += 'Erorr: Not found';
    pMsg(msg, (type(domain) !== null));
}
