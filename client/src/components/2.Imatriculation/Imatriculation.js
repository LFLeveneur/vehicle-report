// Import the necessary modules
import { useState, useEffect, useRef } from "react";

// Import elements
import Button from "../Element/Button/Button";
import Input from "../Element/Input/Input";
import Alert from "../Element/Alert/Alert";

function Imatriculation({date, dateObject, dateObjectFormat, scrollToElement, imatriculation, setImatriculation}) {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [imatriculationValid, setImatriculationValid] = useState(false);
    const imatriculationRef = useRef(null);
    const [submit, setSubmit] = useState(false);
    const dateFormat = `${dateObject.day} ${dateObject.dayNumber} ${dateObject.month} ${dateObject.year} à ${dateObjectFormat.hourFormat}h${dateObjectFormat.minuteFormat}`;
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // ---------------------------------------------------------------------------------
    // Set fonctions
    // ---------------------------------------------------------------------------------
    const alertMessage = () => {
      if (imatriculation === '') {
        return <Alert message="Imaticulation obligatoire" type="attention" />
      } else if (imatriculationValid === false) {
        return <Alert message="Imaticulation invalide" type="error" />
      }
    }
  
    const onChangeHandler = (e) => {

      setSubmit(false); // Reset submit

        let value = e.target.value;
        let valueLength = value.length;
        
        // limit the input to 9 characters
        if (valueLength > 9) {
            value = value.slice(0, 9); // return the first 9 characters
        }
        // separate the input into 3 parts (add a '-' after 2 or 6 characters)
        if (valueLength === 2 || valueLength === 6) {
          value += '-'; // add a '-' after 2 or 6 characters
        }

        // if there is a other character than a '-' at the 3 or 7 position, put '-' between the 2 or 6 characters and the other characters
        if (valueLength === 3) {
          for (const caract of caracteres) {
            if (value[2].includes(caract)) {
              let valueRemove = value.slice(0, 2);
              value = valueRemove + '-' + value[2];
            }
          }
        }
        if (valueLength === 7) {
          for (const caract of caracteres) {
            if (value[6].includes(caract)) {
              let valueRemove = value.slice(0, 6);
              value = valueRemove + '-' + value[6];
            }
          }
        }

        let valueNew = value;
        let valueUpperCase = valueNew.toUpperCase(); // convert imatriculation to upper case
        setImatriculation(valueUpperCase);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); // prevent page reload (no refresh)
        
        setSubmit(true); // set submit to true

        // verify if imatriculation is valid (9 characters, only numbers, letter and '-')
        if (imatriculation.length === 9) {
          let caracteresPlus = caracteres + '-';
          for (const caractereImat of imatriculation) {
              if (caracteresPlus.indexOf(caractereImat) === -1) {
                  // Imat NO valid
                  setImatriculationValid(false)
                  return;
              } else {
                  // Imat VALID
                  setImatriculationValid(true)
              }
          }
        } else {
            // Imat NO valid
            setImatriculationValid(false)
            return;
        }
    }

    // ---------------------------------------------------------------------------------
    // Set hooks
    // ---------------------------------------------------------------------------------
    useEffect(() => {
      if (submit === true) {
        // Make the alert message disappear after 5 seconds
        setTimeout(() => {
          setSubmit(false);
          setImatriculationValid(false); //!\\ reset imatriculationValid otherwise if the request is sent twice
        }, 5000);
      }


      if (imatriculationValid === false) {
        const keyDownHandler = e => {
          // remove the last character if the user press backspace
          if (e.key === 'Backspace') {
            e.preventDefault(); // prevent page reload (no refresh)
            // setImatriculation('');
            setImatriculation(imatriculation.slice(0, -1));
          }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }

      // if imatriculation is valid, send it to the API
      if (imatriculationValid) {
        let idTicket = `${dateObject.year}${dateObjectFormat.monthNumberFormat}${dateObjectFormat.dayNumberFormat}_${dateObjectFormat.hourFormat}${dateObjectFormat.minuteFormat}${dateObjectFormat.secondFormat}_${imatriculation.split('-')[0]}${imatriculation.split('-')[1]}${imatriculation.split('-')[2]}`;
          fetch(
            `http://localhost:3000/api/signal/new`, // url API for create new signal in the database
            {
              method: "POST",
              body: JSON.stringify({
                imatriculation: imatriculation,
                date: date,
                dateFormat: dateFormat,
                idTicket: idTicket
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((response) => response.json())
          .then((json) => console.log(json))
          .catch((err) => console.log(err.message))

          // fetch is successfull scroll to the next question and displayNone this question
          imatriculationRef.current.classList.add('displayNone');
          scrollToElement(document.getElementById('picture'));
      }
    } , [imatriculation, setImatriculation, imatriculationValid, date, dateFormat, dateObject, dateObjectFormat, scrollToElement, submit]);

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <div className={`form-container container-question`} id="imatriculation" ref={imatriculationRef}>
            <form className="content-question">
                <h1 className="question">Quelle est la plaque d’immatriculation du véhicule ?</h1>
                <p className="remarque">Cette réponse esy obligatoire *</p>
                <Input value={imatriculation} placeholder={'Example : XX-XXX-XX'} onChange={(e) => {onChangeHandler(e)}} style={{textTransform: 'uppercase'}}/>
                {submit ? alertMessage() : null /* display the alert message if submit the form */}
                <Button type="submit" text={'Suivant'} onClick={(e) => {onSubmitHandler(e)}}/>
            </form>
        </div>
    );
}
export default Imatriculation;