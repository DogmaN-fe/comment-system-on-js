import MainComment from "./tsClasses/mainComment.js";


/**
 * Функция добавляет кнопкам лайка возможность изменять их количество на сайте
 */
export default function changeCountLikes(commentary: MainComment, changedCountLikes: number) {
    const changeLikes = document.querySelectorAll(`[data-id-commentary="${commentary.GetIdComentary()}"]`);
    const decreaseButton = changeLikes[1];
    const increaseButton = changeLikes[3];
    const likesCounter = changeLikes[2];

    decreaseButton.addEventListener('click', () => {
        if ((Number(likesCounter.innerHTML) - changedCountLikes) < 0) {
            likesCounter.classList.add('count-likes_red');
        }
        likesCounter.innerHTML = String(Number(likesCounter.innerHTML) - changedCountLikes);
        commentary.changeCountLikes(-changedCountLikes);
        commentary.saveComentOnLocalStorage();
    });

    increaseButton.addEventListener('click', () => {
        if((Number(likesCounter.innerHTML) + changedCountLikes) >= 0){
            likesCounter.classList.remove('count-likes_red');
        }
        likesCounter.innerHTML = String(Number(likesCounter.innerHTML) + changedCountLikes);
        commentary.changeCountLikes(changedCountLikes);
        commentary.saveComentOnLocalStorage();
    });
}
