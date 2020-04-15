import htmlParser from 'html-react-parser';

const FunctionArticle = ({ article }) => {
    return (
        <div style={{ marginBottom: '50px' }} className="container-fluid">
            {(article != undefined) && htmlParser(article)}
        </div>
    );
}

export default FunctionArticle;