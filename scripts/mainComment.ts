export default class MainComment {
    private userName: string;
    private userPhoto: string;
    private datePublication: string;
    private commentaryText: string;
    private countLikes: null | number;
    private idComment: null | number;


    constructor(userName: string, userPhoto: string, datePublication: string, commentaryText: string, countLikes: null | number, idComment: null | number) {
        this.userName = userName;
        this.userPhoto = userPhoto;
        this.datePublication = datePublication;
        this.commentaryText = commentaryText;
        this.countLikes = countLikes;
        this.idComment = idComment;
    }

    showComment() {
        const comment = document.createElement('div');
        comment.className = 'comment flex';

        const img = document.createElement('img');
        img.className = 'photo-author';
        img.src = this.userPhoto;
        img.alt = 'аватарка комментатора';
        comment.appendChild(img);

        const content = document.createElement('div');
        content.className = 'content';
        comment.appendChild(content);

        const title = document.createElement('span');
        title.className = 'title flex';
        content.appendChild(title);

        const name = document.createElement('p');
        name.className = 'name-author name-commentator';
        name.innerText = this.userName;
        title.appendChild(name);

        const date = document.createElement('p');
        date.className = 'date-published';
        date.innerText = this.datePublication;
        title.appendChild(date);

        const description = document.createElement('p');
        description.className = 'description';
        description.innerText = this.commentaryText;
        content.appendChild(description);

        const actions = document.createElement('span');
        actions.className = 'actions flex';
        content.appendChild(actions);

        const answerImg = document.createElement('img');
        answerImg.className = 'answer';
        answerImg.src = './images/Mask group.svg';
        answerImg.alt = '';
        actions.appendChild(answerImg);

        const answerDesc = document.createElement('p');
        answerDesc.className = 'actions-desc';
        answerDesc.innerText = 'Ответить';
        actions.appendChild(answerDesc);

        const favouritesImg = document.createElement('img');
        favouritesImg.className = 'in-favourites';
        favouritesImg.src = './images/Mask group (1).svg';
        favouritesImg.alt = '';
        actions.appendChild(favouritesImg);

        const favouritesDesc = document.createElement('p');
        favouritesDesc.className = 'actions-desc';
        favouritesDesc.innerText = 'В избранном';
        actions.appendChild(favouritesDesc);

        const likes = document.createElement('span');
        likes.className = 'likes flex';
        actions.appendChild(likes);

        const minusLike = document.createElement('div');
        minusLike.className = 'circle-like';
        likes.appendChild(minusLike);

        const minus = document.createElement('span');
        minus.className = 'minus';
        minus.innerText = '-';
        minusLike.appendChild(minus);

        const likeCount = document.createElement('div');
        likeCount.className = 'count-likes';
        likeCount.innerText = `${this.countLikes}`;
        likes.appendChild(likeCount);

        const plusLike = document.createElement('div');
        plusLike.className = 'circle-like';
        likes.appendChild(plusLike);

        const plus = document.createElement('span');
        plus.className = 'minus plus';
        plus.innerText = '+';
        plusLike.appendChild(plus);

        return comment

    }

    saveComentOnLocalStorage(): void {
        type commentary_settings = {
            userName: string;
            userPhoto: string;
            datePublication: string;
            commentaryText: string;
            countLikes: null | number;
            idComment: null | number;
        }
        const commentary: commentary_settings = {
            userName: this.userName,
            userPhoto: this.userPhoto,
            datePublication: this.datePublication,
            commentaryText: this.commentaryText,
            countLikes: this.countLikes,
            idComment: this.idComment,
        };

        localStorage.setItem(`commentary-${this.userName}-${this.idComment}`, JSON.stringify(commentary));
    }
}