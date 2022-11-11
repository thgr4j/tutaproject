"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    if (domregex.test(domain.toLowerCase()) || ipregex.test(domain))
        return true;
    else
        return false;
}
function srvCheck(domain) {
    var msg = 'The domain name is valid.\n';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://' + domain);
    xhr.send();
    xhr.onload = () => {
        const exists = (xhr.status == 200);
        msg += xhr.status + ': ' + xhr.responseText;
        pMsg(msg, exists);
    };
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function check() {
    return __awaiter(this, void 0, void 0, function* () {
        const input = document.getElementById('urlCheck');
        var domain = input.value;
        if (domValid(domain)) {
            pMsg('The domain name is valid.', true);
            yield delay(2000);
            srvCheck(domain);
        }
        else
            pMsg('The domain name is invalid.', false);
    });
}
