import Button from "../Button/Button"
import './Download.css'

const Download = ({data , type ='text/plain' , name }) => {

    const download = () => {
        const linkel = document.createElement('a');
        linkel.classList.add('temp-download')
        linkel.download = name ;
        linkel.href = URL.createObjectURL(new Blob([data],{type}));
        linkel.click();
        URL.revokeObjectURL(linkel.href)
    }

    return (
        <div className="btn-download">
            <Button text={'download'} click={download}/>
        </div>
    )
}

export default Download