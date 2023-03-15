import './Button.css'

const Button = ({text,click,type='btn-default'}) => {
    return (
        <div className={['btn-primary',type].join(' ')} onClick={click}>
            {text}
        </div>
    )
}

export default Button