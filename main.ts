import MainComment from "./scripts/mainComment.js";

const addBtn = document.querySelector("#add-button") as HTMLButtonElement;
const textArea = document.querySelector('#new-comment') as HTMLTextAreaElement;
const allComments = document.querySelector('.comments') as HTMLDivElement;
const maxSymbolsErorr = document.querySelector('.max-symbols') as HTMLParagraphElement;

let arrCommnets: Array<MainComment> = [];
let CountCommentares = Number(localStorage.getItem(`CountCommentares`) || '') || 0;

/**
 * Добавление комментария на старницу
 */
function addCommentary(): void {
    // Фиксирование даты написания комментария
    const date: Date = new Date;

    let comment: MainComment = new MainComment("Максим Авдеенко", "./images/Максим Авдеенко.png", date.toLocaleString(), textArea.value, 5, ++CountCommentares);

    allComments.prepend(comment.showComment());

    comment.saveComentOnLocalStorage();
    saveCountCommentares();

    textArea.value = '';
    maxSymbolsErorr.textContent = `Макс. 1000 символов`;


    addBtn.removeEventListener('click', addCommentary)
}

/**
 * Проверка на количество символов
 */
function checkMaxSymbols(): void {
    let countSymbols: number = textArea.value.length;

    // Проверка корекности комментария
    if (countSymbols <= 1000 && countSymbols > 0 && textArea.value != '') {
        addBtn.addEventListener('click', addCommentary);
        addBtn.style.backgroundColor = '#ABD873';
        maxSymbolsErorr.textContent = `${countSymbols}/1000`;

    }
    else if (countSymbols > 1000) {
        addBtn.removeEventListener('click', addCommentary)
        addBtn.style.backgroundColor = '#D9D9D9';
        maxSymbolsErorr.style.color = '#F00';
        maxSymbolsErorr.textContent = `${countSymbols}/1000 Слишком длинное сообщение`;
    }
    else {
        addBtn.removeEventListener('click', addCommentary)
        addBtn.style.backgroundColor = '#D9D9D9';
        maxSymbolsErorr.textContent = `Макс. 1000 символов`;
    }

}

/**
 * Сохранение количества комментариев
 */
function saveCountCommentares(): void {
    localStorage.setItem('CountCommentares', `${CountCommentares}`);
}


/**
 * Загрузка комментариев
 */
function loadCommentares(): void {
    for (let i = 1; i <= CountCommentares; i++) {
        let str: string = localStorage.getItem(`commentary-Максим Авдеенко-${i}`) || ' ';

        let parseJSON = JSON.parse(str);

        let comment: MainComment = new MainComment(parseJSON.userName, parseJSON.userPhoto, parseJSON.datePublication, parseJSON.commentaryText, parseJSON.countLikes, parseJSON.idComment);

        allComments.prepend(comment.showComment());
    }
}

textArea.addEventListener('input', checkMaxSymbols);
loadCommentares();