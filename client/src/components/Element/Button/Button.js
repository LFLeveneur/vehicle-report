// Import the necessary modules
import { useState } from 'react';

const Button = ({text, onClick, type}) => {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [isHover, setIsHover] = useState(false);
    const buttonClass = isHover ? 'button buttonHover' : 'button';

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <>
            <button
                type={type}
                className={buttonClass}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={onClick}
            >
             {text}</button>
        </>
    );
}
export default Button;
