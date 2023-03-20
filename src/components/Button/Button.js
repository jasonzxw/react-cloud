/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-03-20 14:40:30
 * @FilePath: \react-cloud\src\components\Button\Button.js
 */
import {forwardRef} from 'react'
import './Button.css'

const Button = forwardRef((props,ref = null) => {
    const {text,click,type='btn-default' , id=""} = props ;
    return (
        <div className={['btn-primary',type].join(' ')} onClick={click} ref={ref} id={id}>
            {text}
        </div>
    )
})

export default Button