import htmlParser from 'html-react-parser';

const FunctionArticle = ({ article }) => {
    return (
        <div style={{ marginBottom: '50px' }} className="container-fluid">
            {(article != undefined) ? htmlParser(article) : <p className="text-center">L'article n'est pas encore disponible.</p>}
        </div>
    );
}

export default FunctionArticle;