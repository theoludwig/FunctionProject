import FunctionTabsContextProvider from '../../contexts/FunctionTabsContext';
import HeadTag from '../../components/HeadTag';
import FunctionComponentTop from '../../components/FunctionComponentTop';
import FunctionTabsTop from '../../components/FunctionTabs/FunctionTabsTop';
import FunctionTabs from '../../components/FunctionTabs/FunctionTabs';
import FunctionForm from '../../components/FunctionForm';
import redirect from '../../utils/redirect';
import api from '../../utils/api';
import { API_URL } from '../../utils/config';
import '../../public/css/pages/FunctionComponent.css';

const FunctionComponent = (props) => {
    
    // Constantes
    const createdAt = new Date(props.createdAt);
    const publicationDate = `${('0'+createdAt.getDate()).slice(-2)}/${('0'+(createdAt.getMonth()+1)).slice(-2)}/${createdAt.getFullYear()}`;

    return (
        <FunctionTabsContextProvider>
            <HeadTag title={props.title} description={props.description} image={API_URL + props.image} />

            <div className="container-fluid">

                <FunctionTabsTop type={props.type} />
                <FunctionComponentTop { ...props } API_URL={API_URL} publicationDate={publicationDate} />

                <FunctionTabs type={props.type}>
                    {(props.type !== "article") ? 
                        <FunctionForm inputArray={ [...props.utilizationForm || []] } slug={props.slug} /> 
                    : 
                        <div className="FunctionComponent__slide text-center">Slide 1</div>
                    }
                    <div className="FunctionComponent__slide text-center">Slide 2</div>
                    <div className="FunctionComponent__slide text-center">Slide 3</div>
                </FunctionTabs>

            </div>
        </FunctionTabsContextProvider>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    return api.get(`/functions/${slug}`)
        .then((response) => ({ props: response.data }))
        .catch(() => redirect(context, '/404'));
}

export default FunctionComponent;