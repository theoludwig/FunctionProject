import Cookies from "universal-cookie";

const addFunction = (props) => {
    return (
        <p>Crée une nouvelle fonction</p>
    );
}

export async function getServerSideProps({ req }) {
    const cookies = new Cookies(req.headers.cookie);
    return {
        props: { 
            user: { ...cookies.get('user') }
        }
    };
}

export default addFunction;