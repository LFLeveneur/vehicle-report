// Import the necessary modules
import { useState } from 'react';

const ButtonDelete = ({text, onClick}) => {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [isHover, setIsHover] = useState(false);
    const buttonDeleteClass = isHover ? 'buttonDelete buttonDeleteHover' : 'buttonDelete';

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <>
            <button
                className={buttonDeleteClass}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={onClick}
            >
                {text}
                <span>x</span>
            </button>
        </>
    );
}
export default ButtonDelete;