import { useEffect , useRef} from 'react'
import './upload.css'
import Button from "../Button/Button"

// upload file component 暂时还不完善
const Upload = ({mutiple = false , accept = true}) => {

    const uploadRef = useRef();
    const containerRef =  useRef();

    const generateFileinfo = (file) => {
        let elFile ;
        if(file.type.includes('image')){
            elFile = document.createElement('img');
            elFile.classList.add('uploadImg')
            let url = URL.createObjectURL(file);
            elFile.src = url ;
            elFile.onload = function(){
                URL.revokeObjectURL(url)
            }
        }else{
            elFile = document.createElement('div');
            elFile.classList.add('upload-filename')
            elFile.textContent = file.name
        }
        return elFile
    }

    const btn_upload = () => {
        uploadRef.current.click();
    }

    useEffect(()=> {
        const fileChange = () => {
            console.log('distpach upload file')
            const files = uploadRef.current.files ;
            const fragel = document.createDocumentFragment();
            for(let file of files){
                console.log(file.name);
                console.log(file.type);
                console.log(file.size);
                fragel.appendChild(generateFileinfo(file));
                fileread(file)
            }
            containerRef.current.appendChild(fragel)
        }

        const fileread = (file) =>{
            const reader = new FileReader();
            reader.readAsText(file,'UTF-8')
            reader.onload = function(){
                console.log(reader.result)
            }
        }
        uploadRef.current.addEventListener('change',fileChange);
    },[])

    return (
        <div className="upload-container" id='upload-container' ref={containerRef}>
            <input type={'file'} accept={accept} multiple={mutiple} style={{display: 'none'}} id='upload' ref={uploadRef}/>
            <Button text={'Upload'} click={btn_upload}/>
        </div>
    )
}

export default Upload