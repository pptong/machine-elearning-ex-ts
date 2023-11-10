export default function get(path:string)
{
    let xhr = new XMLHttpRequest()
    xhr.open("GET", path, false); 
    xhr.overrideMimeType("text/html;charset=utf-8")
    xhr.send(null)
    return xhr.responseText
}