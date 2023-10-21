// Import the necessary modules
import { useRef } from 'react';

// Import elements
import ImgScooterDot from "../../assets/png/ScootDot.png";
import Button from "../Element/Button/Button";

function Home ({scrollToElement}) {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const homeRef = useRef(null);

    // ---------------------------------------------------------------------------------
    // Set fonctions
    // ---------------------------------------------------------------------------------
    const onClickHandler = () => {
        // ad class displayNone to the home div
        homeRef.current.classList.add('displayNone');
        scrollToElement(document.getElementById('imatriculation'));
    }

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <div className={`form-container home`} ref={homeRef}>
            <section className="home-container">
                <h1>Nous nous excusons de la gêne occasionnée par l'un de nos véhicules</h1>
                <p>Afin que nos Troopers puissent intervenir au plus vite, nous vous remercions de remplir ce formulaire. <br/><br/> Nous vous demanderons une photo du véhicule et de sa plaque d'immatriculation chaque réponse est obligatoire.<br/><br/> Merci pour votre temps.</p>
                <Button text={'Remplir le formulaire'} onClick={onClickHandler}/>
            </section>
            <div className="scoot-dot">
                <img src={ImgScooterDot} alt=""/>
            </div>
        </div>
    );
}
export default Home;