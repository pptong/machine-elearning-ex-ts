export default function get(path: string) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3001/" + path, false);
  xhr.send(null);
  return xhr.responseText;
}
