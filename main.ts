import MainComment from "./tsClasses/mainComment.js";
import AnswerComment from "./tsClasses/answerComment.js";
import changeCountLikes from "./changedLikes.js"

const addBtn = document.querySelector("#add-button") as HTMLButtonElement;

const textArea = document.querySelector('#new-comment') as HTMLTextAreaElement;
const allComments = document.querySelector('.commentares') as HTMLDivElement;
const maxSymbolsErorr = document.querySelector('.info-about-commentary__max-symbols') as HTMLParagraphElement;

let arrCommnets: Array<MainComment> = [];
let arrAnswers: Array<AnswerComment> = [];
let CountCommentares: number = Number(localStorage.getItem(`CountCommentares`) || '');
let CountAnswers: number = Number(localStorage.getItem(`CountAnswers`) || '');

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
 * Добавление комментария на старницу
 */
function addCommentary(): void {
    // Фиксирование даты написания комментария
    const date: Date = new Date;

    let comment: MainComment = new MainComment("Максим Авдеенко", "./images/Максим Авдеенко.png", date.toLocaleString(), textArea.value, 0, ++CountCommentares);

    allComments.prepend(comment.showComment());

    comment.saveComentOnLocalStorage();
    saveCountCommentares();

    textArea.value = '';

    maxSymbolsErorr.textContent = `Макс. 1000 символов`;

    addBtn.style.backgroundColor = '';

    addBtn.removeEventListener('click', addCommentary)
}

/**
 * Добавление ответа на комментарий
 */
function addAnswers(element: MainComment, text: HTMLTextAreaElement) {
    // Фиксирование даты написания комментария
    const date: Date = new Date;

    let answer: AnswerComment = new AnswerComment("Максим Авдеенко", "./images/Максим Авдеенко.png", date.toLocaleString(), text.value, 0, element.GetIdComentary(), ++CountAnswers, element.userName);


    const answers = document.querySelector(`[data-id-commentary="${element.GetIdComentary()}"]`)?.querySelector('.answers') as HTMLDivElement;

    answers.appendChild(answer.showComment());

    answer.saveComentOnLocalStorage();

    saveCountAnswers();

}

/**
 * Сохранение количества комментариев
 */
function saveCountCommentares(): void {
    localStorage.setItem('CountCommentares', `${CountCommentares}`);
}

function saveCountAnswers(): void {
    localStorage.setItem('CountAnswers', `${CountAnswers}`);
}

function activationLikes(): void {
    let was: number = 0;
    arrCommnets.forEach(element1 => {
        arrAnswers.forEach(element2 => {
            if(element1.GetIdComentary() == element2.GetIdComentary()){
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
function loadCommentares(): void {
    for (let i = 1; i <= CountCommentares; i++) {
        let str: string = localStorage.getItem(`commentaryId-Максим Авдеенко_${i}`) || '';

        let parseJSON = JSON.parse(str);

        let commentary: MainComment = new MainComment(parseJSON.userName, parseJSON.userPhoto, parseJSON.datePublication, parseJSON.commentaryText, parseJSON.countLikes, parseJSON.idComment);

        allComments.prepend(commentary.showComment());

        arrCommnets.push(commentary);

        loadAnswer(i);
    }

    // Добавление всем кнопка лайков ивентов с изменением количества лайков
    activationLikes();
}

function loadAnswer(idComment: number): void {
    for (let i = 1; i <= CountAnswers; i++) {

        let str: string = localStorage.getItem(`answerId-Максим Авдеенко_${idComment}_${i}`) || '';

        if (str === '') {
            continue;
        }


        let parseJSON = JSON.parse(str);

        let answer: AnswerComment = new AnswerComment(parseJSON.userName, parseJSON.userPhoto, parseJSON.datePublication, parseJSON.commentaryText, parseJSON.countLikes, parseJSON.idComment, parseJSON.idAnswer, parseJSON.WhoAnswer);

        const answers = document.querySelector(`[data-id-commentary="${idComment}"]`)?.querySelector('.answers') as HTMLDivElement;

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
    const block = document.querySelector(`[data-id-commentary="${element.GetIdComentary()}"]`) as HTMLDivElement;
    const add = block.querySelector('.add-answer') as HTMLParagraphElement;
    const formAnswer = block.querySelector('.form-answer');
    const btn = block.querySelector('#add-new-answer') as HTMLButtonElement;
    const answer = block.querySelector('#new-answer') as HTMLTextAreaElement;

    add.addEventListener('click', () => {
        formAnswer?.classList.remove('hide');
    });

    btn.addEventListener('click', () => {
        addAnswers(element, answer);

        formAnswer?.classList.add('hide');

        answer.value = '';
    });
});

