import { useState , useEffect , useRef} from 'react'
import './TodoList.css'
import Button from '../Button/Button';
import { setItem , getItem , globalKey} from '../../Utils/ls'
import { showToast } from '../../Utils/toast'
const TodoList = () => {
    const [list , setList] = useState([]) ;
    const inputRef = useRef();

    useEffect(()=>{
        const list = getItem(globalKey.todoList) ;
        if(list && list.length>0){
            setList(list)
        }
    },[])

    useEffect(()=>{
        setItem(globalKey.todoList,list)
    },[list])

    const addItem = () => {
        if(inputRef.current.value){
            setList([...list,inputRef.current.value]);
            inputRef.current.value = ''
        }
    }

    const removeItem = (index) => {
        list.splice(index,1);
        setList([...list]);
        showToast('真棒,又完成了一项')
    }

    
    return(
        <div className='todolist-container'>
            <div className='todolist-input'>
            <input placeholder='填入今天想做的事叭' ref={inputRef} className='add-item'/>
            <Button text={'add'} click={addItem}/>
            </div>
            {list.map((item,index) => (
                <ListItem item={item} finishItem={() => removeItem(index)} key={item} index={index}/>
            ))}
        </div>
    )
}

const ListItem = ({ item , index , finishItem}) => {
    return (
        <div className='todoItem'>
            <span className='todoItem-title' title={item}>{index+1}. {item}</span>
            <Button text={'Done'} click={finishItem} type='btn-word'/>
        </div>
    )
}

export default TodoList