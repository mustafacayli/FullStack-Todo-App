import { useState } from "react";

function TodoInput({onGorevEkle}){
    const [metin, setMetin] = useState("");
    
    const handleEkle = () => {
        if(metin.trim() === ""){
            alert("Lütfen bir görev girin");
            return;
        }

        onGorevEkle(metin.trim());
        setMetin("");
    };

    return(
        <div className="input-alani">
            <input 
            type="text"
            placeholder="Yeni görev yazın"
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEkle()}
            />
            <button onClick={handleEkle}>Ekle</button>
        </div>
    );

}

export default TodoInput;