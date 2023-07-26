import MainComment from "./mainComment.js";
export default class AnswerComment extends MainComment {
    constructor(userName, userPhoto, datePublication, commentaryText, countLikes, idComment, idAnswer, WhoAnswer) {
        super(userName, userPhoto, datePublication, commentaryText, countLikes, idComment);
        this.idAnswer = idAnswer;
        this.WhoAnswer = WhoAnswer;
    }
    showComment() {
        const answer = document.createElement('div');
        answer.className = 'added-answer flex';
        answer.setAttribute(`data-id-answer`, `${this.idAnswer}`);
        const img = document.createElement('img');
        img.className = 'photo-author';
        img.src = this.userPhoto;
        img.alt = 'аватарка комментатора';
        answer.appendChild(img);
        const content = document.createElement('div');
        content.className = 'commentary__content';
        answer.appendChild(content);
        const title = document.createElement('span');
        title.className = 'commentary__content-title flex';
        content.appendChild(title);
        const name = document.createElement('p');
        name.className = 'info-about-commentary__name-author name-commentator';
        name.innerText = this.userName;
        title.appendChild(name);
        const answerImgFor = document.createElement('img');
        answerImgFor.className = 'answer';
        answerImgFor.src = './images/Mask group.svg';
        answerImgFor.alt = '';
        title.appendChild(answerImgFor);
        const answerFor = document.createElement('p');
        answerFor.className = 'answer-for';
        answerFor.innerText = this.WhoAnswer;
        title.appendChild(answerFor);
        const date = document.createElement('p');
        date.className = 'title__date-published';
        date.innerText = this.datePublication;
        title.appendChild(date);
        const description = document.createElement('p');
        description.className = 'commentary__content-description';
        description.innerText = this.commentaryText;
        content.appendChild(description);
        const actions = document.createElement('span');
        actions.className = 'commentary__content-actions flex';
        content.appendChild(actions);
        const favouritesImg = document.createElement('img');
        favouritesImg.className = 'in-favourites';
        favouritesImg.src = './images/Mask group (1).svg';
        favouritesImg.alt = '';
        actions.appendChild(favouritesImg);
        const favouritesDesc = document.createElement('p');
        favouritesDesc.className = 'actions-description';
        favouritesDesc.innerText = 'В избранном';
        actions.appendChild(favouritesDesc);
        const likes = document.createElement('span');
        likes.className = 'actions-likes flex';
        actions.appendChild(likes);
        const minusLike = document.createElement('div');
        minusLike.className = 'circle-like';
        minusLike.setAttribute(`data-id-answer`, `${this.idAnswer}`);
        likes.appendChild(minusLike);
        const minus = document.createElement('span');
        minus.className = 'minus';
        minus.innerText = '-';
        minusLike.appendChild(minus);
        const likeCount = document.createElement('div');
        likeCount.className = 'count-likes count-likes_red';
        this.countLikes >= 0 ? likeCount.classList.remove('count-likes_red') : likeCount.classList.add('count-likes_red');
        likeCount.innerText = `${this.countLikes}`;
        likeCount.setAttribute(`data-id-answer`, `${this.idAnswer}`);
        likes.appendChild(likeCount);
        const plusLike = document.createElement('div');
        plusLike.className = 'circle-like';
        plusLike.setAttribute(`data-id-answer`, `${this.idAnswer}`);
        likes.appendChild(plusLike);
        const plus = document.createElement('span');
        plus.className = 'plus';
        plus.innerText = '+';
        plusLike.appendChild(plus);
        return answer;
    }
    saveComentOnLocalStorage() {
        const commentary = {
            userName: this.userName,
            userPhoto: this.userPhoto,
            datePublication: this.datePublication,
            commentaryText: this.commentaryText,
            countLikes: this.countLikes,
            idComment: this.idComment,
            idAnswer: this.idAnswer,
            WhoAnswer: this.WhoAnswer,
        };
        localStorage.setItem(`answerId-${this.userName}_${this.idComment}_${this.idAnswer}`, JSON.stringify(commentary));
    }
    GetIdComentary() {
        return this.idComment;
    }
    GetIdAnswer() {
        return this.idAnswer;
    }
}
