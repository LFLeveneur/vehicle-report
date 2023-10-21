// Import the necessary modules
import { useState, useRef } from "react";

// Import elements
import Button from "../Element/Button/Button";
import Selected from "../Element/Selected/Selected";
import Input from "../Element/Input/Input";

function Situation({date, scrollToElement}) {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [situation, setSituation] = useState([]);
    const [otherSituation, setOtherSituation] = useState('');
    const situationRef = useRef(null);
    
    // ---------------------------------------------------------------------------------
    // Set fonctions
    // ---------------------------------------------------------------------------------
    const onSubmitHandler = (e) => {
        e.preventDefault(); // prevent page reload (no refresh)
        
        // join the situation array and the other situation
        let newSituation = '';
        otherSituation !== '' && situation !== [] ? newSituation = situation.join('. ') + '. ' + otherSituation :
        otherSituation !== '' ? newSituation = otherSituation :
        situation !== [] ? newSituation = situation.join('. ') :
        newSituation = '';
        
        fetch(
          `http://localhost:3000/api/signal/update`, // url API for update information in the database
          {
            method: "POST",
            body: JSON.stringify({
                situation: newSituation, // total of situations
                date: date,
            }),
            headers: {
                "Content-Type": "application/json",
            },
          }
        ).then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err.message))

        // fetch is successfull scroll to the next question and displayNone this question
        situationRef.current.classList.add('displayNone');
        scrollToElement(document.getElementById('thanks'))
      }

    const keyDownHandler = e => {
        // remove the last character if the user press backspace
        if (e.key === 'Backspace') {
            e.preventDefault(); // prevent page reload (no refresh)
            // setImatriculation('');
            setOtherSituation(otherSituation.slice(0, -1));
        }
    };

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <div className={`form-container container-question`} id="situation" ref={situationRef}>
            <section className="content-question">
                <h1 className="question">Situation du véhicule</h1>
                <p className="remarque">Choisissez-en autant que vous voulez*</p>
                <div className="select">
                    <Selected
                        index={'1'}
                        text={`Le véhicule bloque une sortie (garage, voie, etc...)`}
                        situation={situation}
                        setSituation={setSituation}
                    />
                    <Selected
                        index={'2'}
                        text={`Le véhicule est stationné sur un emplacement / propriété privé(e)`}
                        situation={situation}
                        setSituation={setSituation}
                    />
                    <Selected
                        index={'3'}
                        text={`Du fait de la situation, le véhicule met en danger d'autres usagers (trottoir, voie réservée, débris, etc...)`}
                        situation={situation}
                        setSituation={setSituation}
                    />
                    <Selected
                        index={'4'}
                        text={`Le véhicule est endommagé / renversé`}
                        situation={situation}
                        setSituation={setSituation}
                    />
                    <Input placeholder={'Autre...'} onChange={(e) => {setOtherSituation(e.target.value)}} value={otherSituation} onKeyDown={keyDownHandler}/>
                    <Button
                        text={'Suivant'}
                        onClick={(e) => {onSubmitHandler(e)}}/>
                </div>
            </section>
        </div>
    );
}
export default Situation;