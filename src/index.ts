function pMsg(msg: string, valid: boolean) {
    const p = document.getElementById('ctrlMsg') as HTMLParagraphElement
    p.textContent = msg
    if (valid) p.style.color = 'green'
    else p.style.color = 'red'
}


function domValid(domain: string){
    // For domain name
    // source: https://stackoverflow.com/a/3809435
    const domregex: RegExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    // For IPv4
    // source: https://stackoverflow.com/a/36760050
    const ipregex: RegExp = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
    if (domregex.test(domain.toLowerCase()) || ipregex.test(domain)) return true
    else return false
}

function srvCheck(domain: string){
    var msg = 'The domain name is valid.\n'

    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://'+domain)
    xhr.send()
    xhr.onload = () => {
        const exists = (xhr.status == 200)
        msg += xhr.status+': '+xhr.responseText
        pMsg(msg, exists)
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function check() {
    const input = document.getElementById('urlCheck') as HTMLInputElement
    var domain = input.value
    if(domValid(domain)){
        pMsg('The domain name is valid.', true)

        await delay(2000)
        srvCheck(domain)
    }
    else pMsg('The domain name is invalid.', false)
}