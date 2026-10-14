import { useState, useEffect } from "react";

function KullaniciListesi(){
    const [kullanicilar, setKullanicilar] = useState([]);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [hata, setHata] = useState(null);

    useEffect(() => {

        const veriGetir =async () =>{
            try{
                setYukleniyor(true);

                const response = await fetch("https://jsonplaceholder.typicode.com/users");


                if(!response.ok){
                    throw new Error('HTTP Hatası kod: ${response.status}');
                }

                const data = await response.json();
                setKullanicilar(data);                
            }
            catch(err){
                setHata(err.message);
            }
            finally{
                setYukleniyor(false);
            }     
        };

        veriGetir();
    }, []);

    if(yukleniyor){
        return <p style={{textAlign: "center"}}>Veriler yükleniyor lütfen bekleyin...</p>
    }

    if(hata){
        return <p style={{color: "red", textAlign:"center"}}>Hata meydana geldi: {hata}</p>
    }

    return(
        <div style={{marginTop:"20px" }}>
            <h3>Sistem kullanıcıları(Apı verisi)</h3>
            <ul style={{listStyle: "none", padding:0 }}>
                {kullanicilar.map((user) =>(
                    <li
                        key={user.id}
                        style={{
                            background:"#eef2f7",
                            margin: "8px 0", 
                            padding: "10px", 
                            borderRadius: "4px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div>
                            <strong>{user.name}</strong> <br />
                            <small style={{color: "#666"}}>{user.email}</small>
                        </div>
                        <span style={{fontSize: "12px", color: "#007bff"}}>{user.company.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default KullaniciListesi;