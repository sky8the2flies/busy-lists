import React, { useState } from 'react';
import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

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
    }, []);
    const invite = content.loading ? (
        <Loader />
    ) : (
        <>
            {content.board ? (
                <Redirect to={`/boards/${content.board._id}`} />
            ) : (
                <h1>That invite is out of uses or does not exist</h1>
            )}
        </>
    );
    return <>{invite}</>;
};

export default InvitePage;
