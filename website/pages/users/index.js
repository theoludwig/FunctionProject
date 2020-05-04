import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import HeadTag from '../../components/HeadTag';
import Loader from '../../components/Loader';
import api from '../../utils/api';
import '../../public/css/pages/users.css';
import { API_URL } from '../../utils/config/config';

const Users = () => {

    let pageUsers = 1;
    
    const [inputSearch, setInputSearch]     = useState("");
    const [usersData, setUsersData]         = useState({ totalItems: 0, hasMore: true, rows: [] });
    const [isLoadingUsers, setLoadingUsers] = useState(true);

    // Récupère les users si la recherche change
    useEffect(() => {
        pageUsers = 1;
        getUsersData().then((data) => setUsersData(data));
    }, [inputSearch]);

    const getUsersData = async () => {
        setLoadingUsers(true);
        const { data } = await api.get(`/users?page=${pageUsers}&limit=15&search=${inputSearch}`);
        setLoadingUsers(false);
        return data;
    }

    const handleSearchChange = (event) => {
        setInputSearch(event.target.value);
    }

    // Permet la pagination au scroll
    const observer = useRef();
    const lastUserCardRef = useCallback((node) => {
        if (isLoadingUsers) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && usersData.hasMore) {
                pageUsers += 1;
                getUsersData().then((data) => {
                    setUsersData((oldData) => {
                        return { 
                            totalItems: data.totalItems,
                            hasMore: data.hasMore, 
                            rows: [...oldData.rows, ...data.rows] 
                        }
                    });
                }); 
            }
        }, { threshold: 1 });
        if (node) observer.current.observe(node);
    }, [isLoadingUsers, usersData.hasMore]);

    return (
        <Fragment>
            <HeadTag 
                title="Utilisateurs" 
                description="Liste des utilisateurs." 
            />

            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-24">
                        <h1 style={{ marginBottom: 0, paddingTop: "20px" }}>Utilisateurs</h1>
                        <p style={{ marginTop: '5px' }}>La liste des utilisateurs - Total de {usersData.totalItems} utilisateurs :</p>
                    </div>
                </div>

                <div className="Users__search-container row justify-content-center">
                    <input value={inputSearch} onChange={handleSearchChange} type="search" className="Users__form-control Users__search-input" name="search" id="search" placeholder="🔎 Rechercher..." />
                </div>

                <div className="row justify-content-center">
                    {usersData.rows.map((user, index) => {
                        // Si c'est le dernier élément
                        if (usersData.rows.length === index + 1) {
                            return (
                                <div ref={lastUserCardRef} key={user.id} className="UserCard col-sm-24 col-md-10 col-xl-7">
                                    <Link href={"/users/[name]"} as={`/users/${user.name}`}>
                                        <div className="UserCard__container">
                                            <img className="UserCard__logo" src={API_URL + user.logo} alt={user.name} />
                                            <h2 className="UserCard__name">{user.name}</h2>
                                        </div>
                                    </Link>
                                </div>
                            );
                        }
                        return (
                            <div key={user.id} className="UserCard col-sm-24 col-md-10 col-xl-7">
                                <Link href={"/users/[name]"} as={`/users/${user.name}`}>
                                    <div className="UserCard__container">
                                            <img className="UserCard__logo" src={API_URL + user.logo} alt={user.name} />
                                            <h2 className="UserCard__name">{user.name}</h2>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {isLoadingUsers && <Loader />}
            </div>
        </Fragment>
    );
}

export default Users;