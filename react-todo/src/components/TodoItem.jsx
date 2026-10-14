function TodoItem({gorev, onGorevSil}){

    return(
        <li>
            {gorev}
            <button className="sil-butonu" onClick={() => onGorevSil(gorev)}> 
                Sil
            </button>
        </li>
    );

}

export default TodoItem;