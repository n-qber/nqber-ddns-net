
const ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port + '/easy-transfer/api');

ws.onmessage = message =>{

    const info = JSON.parse(message.data)
    
    switch (info.cmd){
        case 'response-id':
            document.querySelector('#client-id').innerText = info.id;
            break
        case 'request-file':
            const download = document.querySelector('#download-url');
	    const oldHref = download.href;
            download.href += "/" + info.transaction_id;
            download.click();
	    download.href = oldHref;
            //window.open(document.querySelector("#download-url") + '/' + info.transaction_id, "_blank");
            //window.open(document.querySelector("#download-url") + '/' + info.transaction_id, "_blank");
	    //windoa.location.href = document.querySelector("#download-url") + '/';
            break
        case 'send-file-now':
            const form = document.querySelector('form');
            form.action += '/' + info.transaction_id;
            form.submit();
            break
    }

}


const sendFileButton = document.querySelector('#send-file-button')
document.querySelector("#file").addEventListener("keypress", event => {

    alert(event.key);
    event.preventDefault();
    if(event.key == "Enter"){
        event.preventDefault();
        //sendFileButton.click();
    }


})

sendFileButton.onclick = (event) => {
    if(document.querySelector('#friend-id').value){
        ws.send(JSON.stringify({
            cmd: 'can-send-file',
            to_client_id: document.querySelector('#friend-id').value,
	    size: document.querySelector("#file").files[0].size
        }))
    }
}

