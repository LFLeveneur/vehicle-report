import ImgScooterDot from "../../assets/png/ScootDot.png";

function Thanks() {
    return (
        <div className={`form-container thanks`} id="thanks">
            <section className="thanks-container">
                <h1>Nous vous remercions pour votre aide, <br/>Nos agents vont intervenir au plus vite.</h1>
                <p>L'équipe Troopy vous présente ses excuses pour la gêne occasionnée.</p>
            </section>
            <div className="scoot-dot">
                <img src={ImgScooterDot} alt=""/>
            </div>
            <section className="thanks-contact">
                <a href="tel:+">
                    <p>+33 01 42 73 34 23</p>
                </a>
                <a href="mailto:serviceclient@troopy.com">
                    <p>serviceclient@troopy.com</p>
                </a>
            </section>
        </div>
    );
}
export default Thanks;