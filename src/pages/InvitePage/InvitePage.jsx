import React, { useState, useEffect } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';

import inviteApi from '../../services/inviteApi';

import Loader from '../../components/Loader/Loader';

const InvitePage = (props) => {
    const [content, setContent] = useState({ board: {}, loading: true });
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const board = await inviteApi.getOne(id);
            setContent({ board, loading: false });
        }
        fetchData();
        return () => {
            setContent({ loading: false });
        };
    }, [id]);
    const invite = content.loading ? (
        <Loader />
    ) : (
        <>
            {content.board._id ? (
                <Redirect to={`/boards/${content.board._id}`} />
            ) : (
                <div className="center-col w-100">
                    <h1>That invite is out of uses or does not exist</h1>
                    <Link to="/" className="btn w-50">
                        Back to home
                    </Link>
                </div>
            )}
        </>
    );
    return <>{invite}</>;
};

export default InvitePage;
