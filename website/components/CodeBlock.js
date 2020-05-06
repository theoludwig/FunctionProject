import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark as styles} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter language={language} style={styles}>
            {value}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;