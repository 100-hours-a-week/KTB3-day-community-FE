import { renderCreate } from "./create.js";
import { renderModify } from "./modify.js";


const backbtn = document.getElementById("backBtn");

backbtn.addEventListener("click", () => {
    window.location.href = "../posts/posts.html";
})


const params = new URLSearchParams(location.search);
const mode = params.get('mode');
const id = params.get('id') ?? -1;

console.log(mode);

if (mode === 'create') {
    await renderCreate();
} else if (mode === 'modify') {
    await renderModify(id);
}