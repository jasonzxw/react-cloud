
import Button from "../Button/Button"
import './Download.css'
import { isFunction } from '../../Utils/type'


const Download = ({data , type ='text/plain' , fileName , generateUrl = false ,btnName = 'download'}) => {

    const download = () => {
        const linkel = document.createElement('a');
        linkel.classList.add('temp-download');
        // Causes the browser to treat the linked URL as a download
        linkel.download = isFunction(fileName) ?  fileName() : fileName ;
        // pass url or data
        linkel.href = generateUrl ? generateUrl() : URL.createObjectURL(new Blob([data],{type}));
        console.log(linkel.href)
        linkel.click();
        URL.revokeObjectURL(linkel.href);
    }

    return (
        <div className="btn-download">
            <Button text={btnName} click={download}/>
        </div>
    )
}

export default Download