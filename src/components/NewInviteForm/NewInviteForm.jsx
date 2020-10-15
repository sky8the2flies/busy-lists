import React, { useState } from 'react';
import styled from 'styled-components';

import inviteApi from '../../services/inviteApi';

const FormContainer = styled.div`
    margin: 2px 5px;
`;

const NewInviteForm = (props) => {
    const [form, setForm] = useState({ uses: 3 });

    const handleChange = (e) => {
        setForm({ [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...form, board: props.board };
            const invite = await inviteApi.createInvite(data);
            props.handleInviteCreate(invite);
        } catch (err) {
            console.log(err);
            //display err for user
        }
    };

    function isFormValid() {
        return !(parseInt(form.uses) >= 0);
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount of uses
                    <p>(0 is unlimited)</p>
                    <input
                        name="uses"
                        type="number"
                        value={form.uses}
                        onChange={handleChange}
                        autoFocus
                    />
                </label>
                <button disabled={isFormValid()}>Add Invite</button>
            </form>
        </FormContainer>
    );
};

export default NewInviteForm;
