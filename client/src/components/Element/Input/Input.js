const Input = ({value, placeholder, onChange, style, onKeyDown}) => {
    
    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <>
            <input className="input" type="text" value={value} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} style={style}/>
        </>
    );
}
export default Input;