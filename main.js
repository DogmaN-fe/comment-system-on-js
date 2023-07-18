import MainComment from "./scripts/mainComment.js";
const addBtn = document.querySelector("#add-button");
const textArea = document.querySelector('#new-comment');
const allComments = document.querySelector('.comments');
const maxSymbolsErorr = document.querySelector('.max-symbols');
let arrCommnets = [];
let CountCommentares = Number(localStorage.getItem(`CountCommentares`) || '') || 0;
/**
 * Добавление комментария на старницу
 */
function addCommentary() {
    // Фиксирование даты написания комментария
    const date = new Date;
    let comment = new MainComment("Максим Авдеенко", "./images/Максим Авдеенко.png", date.toLocaleString(), textArea.value, 5, ++CountCommentares);
    allComments.prepend(comment.showComment());
    comment.saveComentOnLocalStorage();
    saveCountCommentares();
    textArea.value = '';
    maxSymbolsErorr.textContent = `Макс. 1000 символов`;
    addBtn.removeEventListener('click', addCommentary);
}
/**
 * Проверка на количество символов
 */
function checkMaxSymbols() {
    let countSymbols = textArea.value.length;
    // Проверка корекности комментария
    if (countSymbols <= 1000 && countSymbols > 0 && textArea.value != '') {
        addBtn.addEventListener('click', addCommentary);
        addBtn.style.backgroundColor = '#ABD873';
        maxSymbolsErorr.textContent = `${countSymbols}/1000`;
    }
    else if (countSymbols > 1000) {
        addBtn.removeEventListener('click', addCommentary);
        addBtn.style.backgroundColor = '#D9D9D9';
        maxSymbolsErorr.style.color = '#F00';
        maxSymbolsErorr.textContent = `${countSymbols}/1000 Слишком длинное сообщение`;
    }
    else {
        addBtn.removeEventListener('click', addCommentary);
        addBtn.style.backgroundColor = '#D9D9D9';
        maxSymbolsErorr.textContent = `Макс. 1000 символов`;
    }
}
/**
 * Сохранение количества комментариев
 */
function saveCountCommentares() {
    localStorage.setItem('CountCommentares', `${CountCommentares}`);
}
/**
 * Загрузка комментариев
 */
function loadCommentares() {
    for (let i = 1; i <= CountCommentares; i++) {
        let str = localStorage.getItem(`commentary-Максим Авдеенко-${i}`) || ' ';
        let parseJSON = JSON.parse(str);
        let comment = new MainComment(parseJSON.userName, parseJSON.userPhoto, parseJSON.datePublication, parseJSON.commentaryText, parseJSON.countLikes, parseJSON.idComment);
        allComments.prepend(comment.showComment());
    }
}
textArea.addEventListener('input', checkMaxSymbols);
loadCommentares();
