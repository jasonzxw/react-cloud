import './Toast.css'

const Toast = ({text}) => {
    return (
        <div className="toast" id="toast">
            {text}
        </div>
    )
}

export default Toast