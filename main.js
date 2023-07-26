import MainComment from "./tsClasses/mainComment.js";
import AnswerComment from "./tsClasses/answerComment.js";
import changeCountLikes from "./changedLikes.js";
const addBtn = document.querySelector("#add-button");
const textArea = document.querySelector('#new-comment');
const allComments = document.querySelector('.commentares');
const maxSymbolsErorr = document.querySelector('.info-about-commentary__max-symbols');
let arrCommnets = [];
let arrAnswers = [];
let CountCommentares = Number(localStorage.getItem(`CountCommentares`) || '');
let CountAnswers = Number(localStorage.getItem(`CountAnswers`) || '');
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
 * Добавление комментария на старницу
 */
function addCommentary() {
    // Фиксирование даты написания комментария
    const date = new Date;
    let comment = new MainComment("Максим Авдеенко", "./images/Максим Авдеенко.png", date.toLocaleString(), textArea.value, 0, ++CountCommentares);
    allComments.prepend(comment.showComment());
    comment.saveComentOnLocalStorage();
    saveCountCommentares();
    textArea.value = '';
    maxSymbolsErorr.textContent = `Макс. 1000 символов`;
    addBtn.style.backgroundColor = '';
    addBtn.removeEventListener('click', addCommentary);
}
/**
 * Добавление ответа на комментарий
 */
function addAnswers(element, text) {
    var _a;
    // Фиксирование даты написания комментария
    const date = new Date;
    let answer = new AnswerComment("Максим Авдеенко", "./images/Максим Авдеенко.png", date.toLocaleString(), text.value, 0, element.GetIdComentary(), ++CountAnswers, element.userName);
    const answers = (_a = document.querySelector(`[data-id-commentary="${element.GetIdComentary()}"]`)) === null || _a === void 0 ? void 0 : _a.querySelector('.answers');
    answers.appendChild(answer.showComment());
    answer.saveComentOnLocalStorage();
    saveCountAnswers();
}
/**
 * Сохранение количества комментариев
 */
function saveCountCommentares() {
    localStorage.setItem('CountCommentares', `${CountCommentares}`);
}
function saveCountAnswers() {
    localStorage.setItem('CountAnswers', `${CountAnswers}`);
}
function activationLikes() {
    let was = 0;
    arrCommnets.forEach(element1 => {
        arrAnswers.forEach(element2 => {
            if (element1.GetIdComentary() == element2.GetIdComentary()) {
                changeCountLikes(element1, element2, 1, was);
                was++;
            }
        });
        was = 0;
    });
}
/**
 * Загрузка комментариев
 */
function loadCommentares() {
    for (let i = 1; i <= CountCommentares; i++) {
        let str = localStorage.getItem(`commentaryId-Максим Авдеенко_${i}`) || '';
        let parseJSON = JSON.parse(str);
        let commentary = new MainComment(parseJSON.userName, parseJSON.userPhoto, parseJSON.datePublication, parseJSON.commentaryText, parseJSON.countLikes, parseJSON.idComment);
        allComments.prepend(commentary.showComment());
        arrCommnets.push(commentary);
        loadAnswer(i);
    }
    // Добавление всем кнопка лайков ивентов с изменением количества лайков
    activationLikes();
}
function loadAnswer(idComment) {
    var _a;
    for (let i = 1; i <= CountAnswers; i++) {
        let str = localStorage.getItem(`answerId-Максим Авдеенко_${idComment}_${i}`) || '';
        if (str === '') {
            continue;
        }
        let parseJSON = JSON.parse(str);
        let answer = new AnswerComment(parseJSON.userName, parseJSON.userPhoto, parseJSON.datePublication, parseJSON.commentaryText, parseJSON.countLikes, parseJSON.idComment, parseJSON.idAnswer, parseJSON.WhoAnswer);
        const answers = (_a = document.querySelector(`[data-id-commentary="${idComment}"]`)) === null || _a === void 0 ? void 0 : _a.querySelector('.answers');
        answers.prepend(answer.showComment());
        arrAnswers.push(answer);
    }
}
////////////////////////////////////////////////////
textArea.addEventListener('input', checkMaxSymbols);
// Загрузка комментариев перед добавление ивентов кнопка
loadCommentares();
// Работа с ответами на комментарий
const addAnswersBtn = document.querySelectorAll('.add-answer');
arrCommnets.forEach(element => {
    const block = document.querySelector(`[data-id-commentary="${element.GetIdComentary()}"]`);
    const add = block.querySelector('.add-answer');
    const formAnswer = block.querySelector('.form-answer');
    const btn = block.querySelector('#add-new-answer');
    const answer = block.querySelector('#new-answer');
    add.addEventListener('click', () => {
        formAnswer === null || formAnswer === void 0 ? void 0 : formAnswer.classList.remove('hide');
    });
    btn.addEventListener('click', () => {
        addAnswers(element, answer);
        formAnswer === null || formAnswer === void 0 ? void 0 : formAnswer.classList.add('hide');
        answer.value = '';
    });
});
