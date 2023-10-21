// Import the necessary modules
import { useState } from "react";

// Import pages components
import Home from '../components/1.Home/Home';
import Imatriculation from '../components/2.Imatriculation/Imatriculation';
import Picture from '../components/3.Picture/Picture';
import Situation from '../components/4.Situation/Situation';
import Thanks from '../components/5.Thanks/Thanks';

// Import elements
import SvgLogo from "./../assets/svg/SvgLogo";


function Form() {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [imatriculation, setImatriculation] = useState('');
    const newDate = new Date();
    const dateObject = {
        date: newDate.toJSON(),
        year: newDate.getFullYear(),
        monthNumber: newDate.getMonth() + 1, // getMonth() returns a number between 0 and 11
        month: newDate.toLocaleString('fr-FR', { month: 'long' }),
        dayNumber: newDate.getDate(),
        day: newDate.toLocaleString('fr-FR', { weekday: 'long' }),
        hour: newDate.getHours(),
        minute: newDate.getMinutes(),
        second: newDate.getSeconds()
    }
    const dateObjectFormat = {
        monthNumberFormat: dateObject.monthNumber < 10 ? '0' + dateObject.monthNumber : dateObject.monthNumber,// add a 0 if the month is less than 10 (ex: 01 -> 01)
        dayNumberFormat: dateObject.dayNumber < 10 ? '0' + dateObject.dayNumber : dateObject.dayNumber, // add a 0 if the day is less than 10 (ex: 01 -> 01)
        hourFormat: dateObject.hour < 10 ? '0' + dateObject.hour : dateObject.hour, // add a 0 if the hour is less than 10 (ex: 01 -> 01)
        minuteFormat: dateObject.minute < 10 ? '0' + dateObject.minute : dateObject.minute, // add a 0 if the minute is less than 10 (ex: 00h1 -> 00h01)
        secondFormat: dateObject.second < 10 ? '0' + dateObject.second : dateObject.second // add a 0 if the second is less than 10 (ex: 00h1 -> 00h01)
        
    }

    // ---------------------------------------------------------------------------------
    // Set fonctions
    // ---------------------------------------------------------------------------------
    const scrollToElement = (element) => {
        // sroll to the next page
        window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth"
        });
    }
    
    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <div className='form'>
            <div className="logo">
                <SvgLogo/>
            </div>
            <Home scrollToElement={scrollToElement} />
            <Imatriculation scrollToElement={scrollToElement} date={dateObject.date} dateObject={dateObject} dateObjectFormat={dateObjectFormat} imatriculation={imatriculation} setImatriculation={setImatriculation} />
            <Picture scrollToElement={scrollToElement} date={dateObject.date} dateObject={dateObject} dateObjectFormat={dateObjectFormat} imatriculation={imatriculation} />
            <Situation scrollToElement={scrollToElement} date={dateObject.date} />
            <Thanks />
        </div>
    );
}

export default Form;