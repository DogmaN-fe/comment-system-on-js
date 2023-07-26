export default class MainComment {
    constructor(userName, userPhoto, datePublication, commentaryText, countLikes, idComment) {
        this.userName = userName;
        this.userPhoto = userPhoto;
        this.datePublication = datePublication;
        this.commentaryText = commentaryText;
        this.countLikes = countLikes;
        this.idComment = idComment;
    }
    showComment() {
        const block = document.createElement('div');
        block.className = 'block-commentary-and-answers';
        block.setAttribute(`data-id-commentary`, `${this.idComment}`);
        const comment = document.createElement('div');
        comment.className = 'commentary flex';
        const img = document.createElement('img');
        img.className = 'photo-author';
        img.src = this.userPhoto;
        img.alt = 'аватарка комментатора';
        comment.appendChild(img);
        const content = document.createElement('div');
        content.className = 'commentary__content';
        comment.appendChild(content);
        block.appendChild(comment);
        const title = document.createElement('span');
        title.className = 'commentary__content-title flex';
        content.appendChild(title);
        const name = document.createElement('p');
        name.className = 'info-about-commentary__name-author name-commentator';
        name.innerText = this.userName;
        title.appendChild(name);
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
        const form = document.createElement("form");
        form.action = "";
        form.className = "form-answer flex hide";
        const textarea = document.createElement("textarea");
        textarea.className = "form__answer-description form__commentary-description";
        textarea.name = "new-answer";
        textarea.id = "new-answer";
        textarea.placeholder = "Введите текст сообщения...";
        const input = document.createElement("input");
        input.className = "for__manswer-add-commentary form__commentary-add-commentary";
        input.id = "add-new-answer";
        input.type = "button";
        input.value = "Отправить";
        form.appendChild(textarea);
        form.appendChild(input);
        content.appendChild(form);
        const answerImg = document.createElement('img');
        answerImg.className = 'answer';
        answerImg.src = './images/Mask group.svg';
        answerImg.alt = '';
        actions.appendChild(answerImg);
        const answerDesc = document.createElement('p');
        answerDesc.className = 'actions-description add-answer';
        answerDesc.innerText = 'Ответить';
        actions.appendChild(answerDesc);
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
        minusLike.setAttribute(`data-id-commentary`, `${this.idComment}`);
        likes.appendChild(minusLike);
        const minus = document.createElement('span');
        minus.className = 'minus';
        minus.innerText = '-';
        minusLike.appendChild(minus);
        const likeCount = document.createElement('div');
        likeCount.className = 'count-likes count-likes_red';
        this.countLikes >= 0 ? likeCount.classList.remove('count-likes_red') : likeCount.classList.add('count-likes_red');
        likeCount.innerText = `${this.countLikes}`;
        likeCount.setAttribute(`data-id-commentary`, `${this.idComment}`);
        likes.appendChild(likeCount);
        const plusLike = document.createElement('div');
        plusLike.className = 'circle-like';
        plusLike.setAttribute(`data-id-commentary`, `${this.idComment}`);
        likes.appendChild(plusLike);
        const plus = document.createElement('span');
        plus.className = 'plus';
        plus.innerText = '+';
        plusLike.appendChild(plus);
        const answers = document.createElement('div');
        answers.className = 'answers';
        block.appendChild(answers);
        return block;
    }
    saveComentOnLocalStorage() {
        const commentary = {
            userName: this.userName,
            userPhoto: this.userPhoto,
            datePublication: this.datePublication,
            commentaryText: this.commentaryText,
            countLikes: this.countLikes,
            idComment: this.idComment,
        };
        localStorage.setItem(`commentaryId-${this.userName}_${this.idComment}`, JSON.stringify(commentary));
    }
    changeCountLikes(plusOrMinus) {
        this.countLikes += plusOrMinus;
    }
    GetIdComentary() {
        return this.idComment;
    }
}
