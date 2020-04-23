import { Fragment, useState } from 'react';
import Cookies from "universal-cookie";
import SwipeableViews from 'react-swipeable-views';
import HeadTag from '../../components/HeadTag';
import AddEditFunction from '../../components/FunctionAdmin/AddEditFunction';
import EditArticleFunction from '../../components/FunctionAdmin/EditArticleFunction';
import EditFormFunction from '../../components/FunctionAdmin/EditFormFunction';
import redirect from '../../utils/redirect';
import api from '../../utils/api';
import { API_URL } from '../../utils/config';
import '../../components/FunctionPage/FunctionTabs.css';
import '../../public/css/pages/admin.css';

const AdminFunctionComponent = (props) => {

    const [slideIndex, setSlideIndex] = useState(0);

    return (
        <Fragment>
            <HeadTag title={props.functionInfo.title} description={props.functionInfo.description} image={API_URL + props.functionInfo.image} />

            <div className="container-fluid">
                <div className="container">
                    <div className="row justify-content-center">
                        <ul className="FunctionTabs__nav">
                            <li className="FunctionTabs__nav-item">
                                <a onClick={() => setSlideIndex(0)} className={`FunctionTabs__nav-link ${(slideIndex === 0) && "FunctionTabs__nav-link-active"}`}>✒️ Modifier</a>
                            </li>
                            <li className="FunctionTabs__nav-item">
                                <a onClick={() => setSlideIndex(1)} className={`FunctionTabs__nav-link ${(slideIndex === 1) && "FunctionTabs__nav-link-active"}`}>📝 Article</a>
                            </li>
                            <li className="FunctionTabs__nav-item">
                                <a onClick={() => setSlideIndex(2)} className={`FunctionTabs__nav-link ${(slideIndex === 2) && "FunctionTabs__nav-link-active"}`}>⚙️ Utilisation</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="container-fluid">
                    <SwipeableViews onChangeIndex={(index) => setSlideIndex(index)} index={slideIndex}>
                        <div className="Admin__Function-slide">
                            <AddEditFunction 
                                defaultInputState={{ ...props.functionInfo }} 
                                user={props.user} 
                                isEditing
                            />
                        </div>
                        <div className="Admin__Function-slide">
                            <EditArticleFunction { ...props } />
                        </div>
                        <div className="Admin__Function-slide">
                            <EditFormFunction { ...props } />
                        </div>
                    </SwipeableViews>
                </div>
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const cookies  = new Cookies(context.req.headers.cookie);
    const user     = { ...cookies.get('user') };
    const { slug } = context.params;
    if (!user.isAdmin) {
        return redirect(context, '/404');
    }
    return api.get(`/admin/functions/${slug}`, { headers: { 'Authorization': user.token } })
        .then((response) => {
            return {
                props: {
                    user,
                    functionInfo: response.data
                }
            };
        })
        .catch(() => redirect(context, '/404'));
}

export default AdminFunctionComponent;