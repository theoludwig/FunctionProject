import Link from 'next/link';
import { forwardRef, useContext } from 'react';
import date from 'date-and-time';
import { UserContext } from '../../../contexts/UserContext';
import { API_URL } from '../../../utils/config/config';
import api from '../../../utils/api';
import './CommentCard.css';

const CommentCard = forwardRef((props, ref) => {

    const { isAuth, user } = useContext(UserContext);

    const deleteCommentById = async () => {
        props.manageComment.setLoadingComments(true);
        if (isAuth && user.token != undefined) {
            try {
                await api.delete(`/comments/${props.id}`, { headers: { 'Authorization': user.token } });
                const newCommentsData = { ...props.manageComment.commentsData };
                const commentIndex    = newCommentsData.rows.findIndex((value) => value.id === props.id);
                newCommentsData.rows.splice(commentIndex, 1);
                props.manageComment.setCommentsData({ hasMore: props.manageComment.commentsData.hasMore, rows: newCommentsData.rows });
            } catch {}
        }
        props.manageComment.setLoadingComments(false);
    }

    return (
        <div ref={ref} className="CommentCard col-24">
            <div className="CommentCard__container">
                <div className="row">
                    <Link href={"/users/[name]"} as={`/users/${props.user.name}`}>
                        <img className="CommentCard__user-logo" src={API_URL + props.user.logo} alt={props.user.name} />    
                    </Link>
                    <span className="CommentCard__message-info">
                        <Link href={"/users/[name]"} as={`/users/${props.user.name}`}>
                            <a>{props.user.name}</a>
                        </Link> 
                        &nbsp;- {date.format(new Date(props.createdAt), 'DD/MM/YYYY à HH:mm', true)} 
                    </span>
                </div>
                <div className="row">
                    <div className="col-24">
                        <p className="CommentCard__message">
                            {props.message}
                        </p>
                        {(isAuth && user.name === props.user.name) && 
                            <p style={{ fontSize: '15px', margin: '15px 0 0 0', fontStyle: 'italic' }}>
                                <a onClick={deleteCommentById} href="#">supprimer le commentaire</a>
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CommentCard;