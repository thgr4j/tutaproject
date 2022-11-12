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
    if (domain.slice(0,9) == 'localhost' || domregex.test(domain.toLowerCase()) || ipregex.test(domain)) return true
    else return false
}

function htmlIndexOf(html: string): boolean {
    var res = false

    const title = html.substr(html.search('<title>')+7, 8)

    if (title == 'Index of') res = true

    return res
}

function srvCheck(domain: string){
    var msg = 'The domain name is valid.\n'

    fetch('http://'+domain,{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain'
        },
        credentials: 'omit'
    })
        .then((response)=>{
            response.text().then((html)=>{
                let headers = response.headers
                // console.log(headers.get('Content-Type'))
                const success = (response.status == 200)

                if (success){
                    let type = headers.get('Content-Type') as string
                    msg += 'Type: '+ type
                    // console.log(html)
                    if (type.slice(0,9) == 'text/html' && htmlIndexOf(html)) msg += '\nThe URL shows to a folder.'
                }
                else if (response.status == 404) msg += 'Error: Not found.'
                else msg += 'Error.'
                        
                pMsg(msg, success)
            })
        })
}

var timeout = 0
            
function check() {
    const input = document.getElementById('urlCheck') as HTMLInputElement
    clearTimeout(timeout)
    var domain = input.value
    if(domValid(domain)){
        pMsg('The domain name is valid.', true)
        timeout = setTimeout(()=>{
            srvCheck(domain)
        }, 2000)
    } else pMsg('The domain name is invalid.', false)
}