import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

interface SupportButtonProps {
    username: string;
    amount?: number;
    currency?: string;
}

const SupportButton: React.FC<SupportButtonProps> = ({
    username,
    amount = 5,
    currency = 'USD'
}) => {
    const paypalUrl = `https://www.paypal.me/${username}/${amount}${currency}`;

    return (
        <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors duration-200 ease-in-out"
        >
            <FontAwesomeIcon icon={faCoffee} className="mr-2" />
            Support My Work
        </a>
    );
};

export default SupportButton;