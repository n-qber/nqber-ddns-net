const button = document.querySelector("#download");
const urlInput = document.querySelector("#url");
urlInput.addEventListener('input', ev => {
    urlInput.setAttribute("size", urlInput.value.length);
});
const linkElement = document.querySelector("#download-url");



button.addEventListener('click', event => {
    const url = urlInput.value;

    if(url == ""){ return; };

    linkElement.setAttribute("href", "./api/download?url=" + url);
    linkElement.click();
});