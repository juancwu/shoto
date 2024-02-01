import * as React from 'react';

interface BaseEmailProps {
    username: string;
}

const BaseEmail: React.FC<Readonly<BaseEmailProps>> = ({ username }) => {
    return (
        <div>
            <h1>Hello, {username}</h1>
        </div>
    );
};

export default BaseEmail;
