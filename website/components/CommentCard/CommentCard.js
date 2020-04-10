import Link from 'next/link';
import { forwardRef } from 'react';
import { API_URL } from '../../utils/config';
import date from 'date-and-time';
import './CommentCard.css';

const CommentCard = forwardRef((props, ref) => {
    return (
        <div ref={ref} className="CommentCard col-24">
            <div className="CommentCard__container">
                <div className="row">
                    <Link href={"/profile/[name]"} as={`/profile/${props.user.name}`}>
                        <img className="CommentCard__user-logo" src={API_URL + props.user.logo} alt={props.user.name} />    
                    </Link>
                    <span className="CommentCard__message-info">
                        <Link href={"/profile/[name]"} as={`/profile/${props.user.name}`}>
                            <a>{props.user.name}</a>
                        </Link> 
                        &nbsp;- {date.format(new Date(props.createdAt), 'DD/MM/YYYY à HH:mm', true)}
                    </span>
                </div>
                <div className="row">
                    <p className="CommentCard__message">
                        {props.message}
                    </p>
                </div>
            </div>
        </div>
    );
});

export default CommentCard;