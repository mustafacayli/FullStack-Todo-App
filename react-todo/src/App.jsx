import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import KullaniciListesi from "./components/kullaniciListesi";
import './App.css';

function App(){
  const [gorevler, setGorevler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const verileriGetir =async () => {
      try{
        const response = await fetch("http://localhost:5000/api/todos");
        const data = await response.json();
        setGorevler(data);
      }
      catch(error){
        console.error("Veri çekilirken hata oluştu: ", error);
      }
      finally{
        setYukleniyor(false);
      }
    };
    
    verileriGetir();
  }, []);


  const gorevEkle = async (yeniMetin) => {
    try{
      const response = await fetch ("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({metin: yeniMetin})
      });

      if (response.ok){
        const yeniGorev = await response.json();
        setGorevler([...gorevler, yeniGorev]);
      }
    }
    catch(error){
      console.error("Görev eklenirken hata oluştu:", error);
    }
  };

  const gorevSil = async (silinecekGorev) => {
    try{
      const response = await fetch(`http://localhost:5000/api/todos/${silinecekGorev.id}`, {
        method: "DELETE"
      });
      if(response.ok){
        setGorevler(gorevler.filter(g => g.id !== silinecekGorev.id));
      }
    }
    catch (error){
      console.error("Görev silinirken hata oluştu", error);
    }
  };
  
  if(yukleniyor){
    return <p>Görev yükleniyor...</p>;
  }

  return(
    <div className="container">
      <h2>Görev Yöneticisi (Full Stack)</h2>
      <TodoInput onGorevEkle={gorevEkle}/>
      <ul>
        {gorevler.map((gorev) => (
         <TodoItem
          key={gorev.id} // Artık index yerine veritabanında ki (backend'deki) gerçek ID'yi kullanıyoruz
          gorev={gorev.metin} // Alt bileşene sadece metni yolluyoruz
          onGorevSil={() => gorevSil(gorev)} // Silme işlemi için tüm görev objesini yolluyoruz ki ID'sine erişebilelim
         /> 
        ))}
      </ul>
      {/* Kullanıcı listesini de ekranda görmek istersen: */}
      <hr style={{ margin: "25px 0" }} />
      <KullaniciListesi />
    </div>
  );

}

export default App;