import React from 'react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Copy = (props) => {
    const [text] = useState(
        `http://${window.location.host}/invites/${props.invite._id}`
    );
    const [copy, setCopy] = useState(false);
    return (
        <div className={'container-row center'}>
            <p>
                {props.invite.uses
                    ? `${props.invite.uses} use${
                          props.invite.uses === 1 ? '' : 's'
                      }`
                    : 'Infinite'}
            </p>
            <CopyToClipboard text={text} onCopy={() => setCopy(true)}>
                <span className="btn">{copy ? 'Copied!' : 'Copy'}</span>
            </CopyToClipboard>
        </div>
    );
};

export default Copy;
