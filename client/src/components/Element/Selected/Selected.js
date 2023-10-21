// Import the necessary modules
import { useState, useRef } from "react";

const Selected = ({text, index, onChange, situation, setSituation}) => {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [isChecked, setIsChecked] = useState(false);
    const elInpute = useRef(null);

    // ---------------------------------------------------------------------------------
    // Set fonctions
    // ---------------------------------------------------------------------------------
    const handleClick = () => {
        setIsChecked(elInpute.current.checked)
        if (elInpute.current.checked) {
            setSituation([...situation, text]);
        } else {
            setSituation(situation.filter(item => item !== text));
        }
    }

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <div className={`selected ${isChecked ? 'selected-active' : ''}`}>
            <input
                type="checkbox"
                id={`checkbox${index}`}
                value={text}
                onChange={onChange}
                ref={elInpute}
                onClick={handleClick}
            />
            <label htmlFor={`checkbox${index}`}>{text}</label>
        </div>
    );
}
export default Selected;