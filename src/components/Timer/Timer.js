import { useEffect , useState } from 'react'
import './Timer.css'
import { getCurrentDate } from '../../Utils/date'

const Timer = () => {

    const renderDateString = (rest = 'origin') => {
        const { year , month , day , hours , min , sec} = getCurrentDate();
        return year+ '-' + month + '-'+ day + '  '+ hours+ ':' + min + ':'+ sec
    }

    const [date , setDate] = useState(renderDateString) ;

    useEffect(()=>{

        const timerId = setInterval(()=>{
            setDate(renderDateString('interval'))
        },1000)

        return () => clearInterval(timerId) ;
    })

    return (
        <div className='Timer-display'>
            {date}
        </div>
    )
}

export default Timer