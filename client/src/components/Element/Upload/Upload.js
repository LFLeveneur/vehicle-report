// Import elements
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import SvgUpload from "../../../assets/svg/SvgUpload";

const Upload = ({onChange, fileUrl, setFileUrl, setFileData, loadProgress, setLoadProgress}) => {

    // ---------------------------------------------------------------------------------
    // Return the component
    // ---------------------------------------------------------------------------------
    return (
        <>
            {(fileUrl && (
                <div className='picture-preview'>
                    <img src={fileUrl} alt=""/>
                    <ButtonDelete text={'Supprimer'} onClick={() => {setFileUrl(''); setFileData(''); setLoadProgress(0)}}/>
                </div>
            )) || (
                <label className="upload">
                    <input type="file" onChange={onChange}/>
                    <SvgUpload />
                    <div className="upload-text">
                        {(loadProgress && (
                            <p>{loadProgress}%</p>
                        )) || (
                            <>
                                <p>Choisissez un fichier</p>
                                <p>Taille maximale : 10Mo</p>
                            </>
                        )
                        }
                    </div>
            
                </label>
            )}
        </>
    );
}
export default Upload;