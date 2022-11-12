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
function htmlIndexOf(html) {
    var res = false;
    const title = html.substr(html.search('<title>') + 7, 8);
    if (title == 'Index of')
        res = true;
    return res;
}
function srvCheck(domain) {
    var msg = 'The domain name is valid.\n';
    fetch('http://' + domain, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain'
        },
        credentials: 'omit'
    })
        .then((response) => {
        response.text().then((html) => {
            let headers = response.headers;
            const success = (response.status == 200);
            if (success) {
                let type = headers.get('Content-Type');
                msg += 'Type: ' + type;
                if (type.slice(0, 9) == 'text/html' && htmlIndexOf(html))
                    msg += '\nThe URL shows to a folder.';
            }
            else if (response.status == 404)
                msg += 'Error: Not found.';
            else
                msg += 'Error.';
            pMsg(msg, success);
        });
    });
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
