/**
 * Функция добавляет кнопкам лайка возможность изменять их количество на сайте
 * @param commentary Комментарий
 * @param itWas Был ли комментарий
 * @param answer Ответ
 */
export default function changeCountLikes(commentary, itWas, answer) {
    const changedCountLikes = 1;
    const changeLikesCommentary = document.querySelectorAll(`[data-id-commentary="${commentary.getIdComentary()}"]`);
    const decreaseButtonchangeLikesCommentary = changeLikesCommentary[1];
    const increaseButtonchangeLikesCommentary = changeLikesCommentary[3];
    const likesCounterchangeLikesCommentary = changeLikesCommentary[2];
    const changeLikesAnswer = document.querySelectorAll(`[data-id-answer="${answer === null || answer === void 0 ? void 0 : answer.GetIdAnswer()}"]`);
    const decreaseButtonchangeLikesAnswer = changeLikesAnswer[1];
    const increaseButtonchangeLikesAnswer = changeLikesAnswer[3];
    const likesCounterchangeLikesAnswer = changeLikesAnswer[2];
    // Для комментариев
    if (itWas === false) {
        decreaseButtonchangeLikesCommentary.addEventListener('click', () => {
            if ((Number(likesCounterchangeLikesCommentary.innerHTML) - changedCountLikes) < 0) {
                likesCounterchangeLikesCommentary.classList.add('count-likes_red');
            }
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
    }
    if (answer !== undefined) {
        // Для ответов
        decreaseButtonchangeLikesAnswer.addEventListener('click', () => {
            if ((Number(likesCounterchangeLikesAnswer.innerHTML) - changedCountLikes) < 0) {
                likesCounterchangeLikesAnswer.classList.add('count-likes_red');
            }
            likesCounterchangeLikesAnswer.innerHTML = String(Number(likesCounterchangeLikesAnswer.innerHTML) - changedCountLikes);
            answer === null || answer === void 0 ? void 0 : answer.changeCountLikes(-changedCountLikes);
            answer === null || answer === void 0 ? void 0 : answer.saveComentOnLocalStorage();
        });
        increaseButtonchangeLikesAnswer.addEventListener('click', () => {
            if ((Number(likesCounterchangeLikesAnswer.innerHTML) + changedCountLikes) >= 0) {
                likesCounterchangeLikesAnswer.classList.remove('count-likes_red');
            }
            likesCounterchangeLikesAnswer.innerHTML = String(Number(likesCounterchangeLikesAnswer.innerHTML) + changedCountLikes);
            answer === null || answer === void 0 ? void 0 : answer.changeCountLikes(changedCountLikes);
            answer === null || answer === void 0 ? void 0 : answer.saveComentOnLocalStorage();
        });
    }
}
