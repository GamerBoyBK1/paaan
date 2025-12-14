import React from 'react';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


interface CustomModalProps {
    visible: boolean;
    onDismissed: () => void;
    children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onDismissed, children }) => {
    if (!visible) return null;

    return (
        <div css={tw`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
            <div css={tw`rounded-lg p-6 relative`}>
                <button
                    onClick={onDismissed}
                    css={tw`absolute top-2 right-2 text-white hover:text-gray-800 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200`}
                    >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;