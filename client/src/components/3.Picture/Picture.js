// Import the necessary modules
import { useEffect, useState, useRef } from "react";
import imageCompression from 'browser-image-compression';

// Import elements
import Button from "../Element/Button/Button";
import Upload from "../Element/Upload/Upload";
import Alert from "../Element/Alert/Alert";

function Picture({date, scrollToElement, dateObject, dateObjectFormat, imatriculation}) {
    // ---------------------------------------------------------------------------------
    // Set variables
    // ---------------------------------------------------------------------------------
    const [fileData, setFileData] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [fileValid, setFileValid] = useState(false);
    const pictureRef = useRef(null); // useRef is used to display url of the picture
    const [submit, setSubmit] = useState(false); // submit is used to display the alert message
    const [loadProgress, setLoadProgress] = useState(0); // display the progress of the picture
        
    // ---------------------------------------------------------------------------------
    // Set fonctions
    // ---------------------------------------------------------------------------------
    const alertMessage = () => {
        if (fileData === '') {
            return <Alert message="Image obligatoire" type="attention" />
        } else if (fileData.size > 10000000) {
            return <Alert message="Image trop grande" type="error" />
        } else if (fileValid === false) {
            return <Alert message="Imaticulation invalide" type="error" />
        }
    }
    
    const onChangeInput = (e) => {
      e.preventDefault(); // prevent default action of the event

      setSubmit(false); // Reset submit
      
      const onProgress = (percent) => {
          setLoadProgress(percent);
      }
      
      // Set parameters for the image compression
      const settingFileCompressor = {
        maxSizeMB: 10,
        maxWidthOrHeight: 2000,
        onProgress: onProgress,
        // fileType: 'image/*' //!\\ important to set the file type (output ex: example.jpeg)
      }
        let file = e.target.files[0];
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
          imageCompression(file, settingFileCompressor)
            .then(
              (compressedFile) => {
                setFileData(compressedFile);
                setFileUrl(URL.createObjectURL(compressedFile));
                console.log(compressedFile);
              }
            )
            .catch(error => {
              console.log(error);
            });
        } else {
          // file is not an image
          setFileData('');
          setFileValid(false);
        }
    }
    
    const onSubmitHandler = (e) => {
          e.preventDefault(); // prevent page reload (no refresh)

          setSubmit(true); // set submit to true

          if (fileData) {
            if (fileData.size > 10000000) {
              // file is too big
              setFileValid(false);
            } else {
              setFileValid(true);
            }
          } else {
              // file is empty
              setFileValid(false);
          }
      };

    // ---------------------------------------------------------------------------------
    // Set hooks
    // ---------------------------------------------------------------------------------
    useEffect(() => {
        if (submit === true) {
            // Make the alert message disappear after 5 seconds
            setTimeout(() => {
              setSubmit(false);
              setFileValid(false); //!\\ reset fileValid otherwise if the request is sent twice
            }, 5000);
          }

        // if file is valid, upload file to server
        if (fileValid) {
          let fileName = `${dateObject.year}-${dateObjectFormat.monthNumberFormat}-${dateObjectFormat.dayNumberFormat}_${dateObjectFormat.hourFormat}${dateObjectFormat.minuteFormat}${dateObjectFormat.secondFormat}_${imatriculation}.${fileData.type.split('/')[1]}`;
          // Create a FormData object (to send the file)
          const data = new FormData();
          data.append("picture", fileData, fileName);
          data.append("date", date); // Add the date for the Id of ticket in the API
  
          fetch(
              `http://localhost:3000/api/signal/picture`, // url API for update picture information in the database
              {
                method: "POST",
                body: data,
              }
          ).then((result) => console.log(result))
          .catch((err) => console.log(err.message))

          // fetch is successfull scroll to the next question and displayNone this question
          pictureRef.current.classList.add('displayNone');
          scrollToElement(document.getElementById('situation'))
        }
    } , [fileData, date, fileValid, scrollToElement, submit, dateObject, dateObjectFormat, imatriculation]);
    
    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <div className={`form-container container-question`} id="picture" ref={pictureRef}>
            <section className="content-question">
                <h1 className="question">Envoyer nous une photo du scooter</h1>
                <p className="remarque">Veuillez privilégier une photo avec un plan large *</p>
                <Upload onChange={(e)=>{onChangeInput(e)}} fileUrl={fileUrl} setFileUrl={setFileUrl} setFileData={setFileData} loadProgress={loadProgress} setLoadProgress={setLoadProgress}/>
                {submit ? alertMessage() : null /* display the alert message if submit the form */}
                <Button type="submit" text={'Suivant'} onClick={(e) => {onSubmitHandler(e)}}/>
            </section>
        </div>
    );
}
export default Picture;