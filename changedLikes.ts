import AnswerComment from "./tsClasses/answerComment.js";
import MainComment from "./tsClasses/mainComment.js";


/**
 * Функция добавляет кнопкам лайка возможность изменять их количество на сайте
 */
export default function changeCountLikes(commentary: MainComment, answer: AnswerComment, changedCountLikes: number) {
    const changeLikesCommentary = document.querySelectorAll(`[data-id-commentary="${commentary.GetIdComentary()}"]`);
    const decreaseButtonchangeLikesCommentary = changeLikesCommentary[1];
    const increaseButtonchangeLikesCommentary = changeLikesCommentary[3];
    const likesCounterchangeLikesCommentary = changeLikesCommentary[2];

    const changeLikesAnswer = document.querySelectorAll(`[data-id-answer="${answer.GetIdAnswer()}"]`);
    const decreaseButtonchangeLikesAnswer = changeLikesAnswer[1];
    const increaseButtonchangeLikesAnswer = changeLikesAnswer[3];
    const likesCounterchangeLikesAnswer = changeLikesAnswer[2];

    
    
    
    // Для комментариев
    decreaseButtonchangeLikesCommentary.addEventListener('click', () => {
        if ((Number(likesCounterchangeLikesCommentary.innerHTML) - changedCountLikes) < 0) {
            likesCounterchangeLikesCommentary.classList.add('count-likes_red');
        }
        console.log(changedCountLikes);
        likesCounterchangeLikesCommentary.innerHTML = String(Number(likesCounterchangeLikesCommentary.innerHTML) - changedCountLikes);
        commentary.changeCountLikes(-changedCountLikes);
        commentary.saveComentOnLocalStorage();
    });

    increaseButtonchangeLikesCommentary.addEventListener('click', () => {
        if ((Number(likesCounterchangeLikesCommentary.innerHTML) + changedCountLikes) >= 0) {
            likesCounterchangeLikesCommentary.classList.remove('count-likes_red');
        }
        likesCounterchangeLikesCommentary.innerHTML = String(Number(likesCounterchangeLikesCommentary.innerHTML) + changedCountLikes);
        commentary.changeCountLikes(changedCountLikes);
        commentary.saveComentOnLocalStorage();
    });


    // Для ответов
    decreaseButtonchangeLikesAnswer.addEventListener('click', () => {
        if ((Number(likesCounterchangeLikesAnswer.innerHTML) - changedCountLikes) < 0) {
            likesCounterchangeLikesAnswer.classList.add('count-likes_red');
        }
        likesCounterchangeLikesAnswer.innerHTML = String(Number(likesCounterchangeLikesAnswer.innerHTML) - changedCountLikes);
        answer.changeCountLikes(-changedCountLikes);
        answer.saveComentOnLocalStorage();
    });

    increaseButtonchangeLikesAnswer.addEventListener('click', () => {
        if ((Number(likesCounterchangeLikesAnswer.innerHTML) + changedCountLikes) >= 0) {
            likesCounterchangeLikesAnswer.classList.remove('count-likes_red');
        }
        likesCounterchangeLikesAnswer.innerHTML = String(Number(likesCounterchangeLikesAnswer.innerHTML) + changedCountLikes);
        answer.changeCountLikes(changedCountLikes);
        answer.saveComentOnLocalStorage();
    });
}
