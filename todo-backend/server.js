import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Veri tabanına başarıyla bağlanıldı"))
    .catch((err) => console.error("Mongo db bağlantı hatası", err));


const gorevSema = new mongoose.Schema({
    metin:{
        type: String,
        required: true
    },
    olusturulmaTarihi:{
        type:Date,
        default:Date.now    
    }
});

const Gorev = mongoose.model('Gorev', gorevSema);


app.get('/api/todos', async (req, res) => {
    try{
        const gorevler = await Gorev.find();
        const formatliGorevler = gorevler.map(g => ({
            id:g._id,
            metin:g.metin
        }));
        res.status(200).json(formatliGorevler);
    }
    catch(error){
        res.status(500).json({hata: "Görevler getirilirken bir hata oluştu"});
    }
});



app.post('/api/todos', async(req, res) => {
    const {metin} = req.body;
    
    if(!metin || metin.trim() === ''){
        return res.status(400).json({hata :"Görev metni boş olamaz"});
    }
    
    try{
        const yeniGorev = new Gorev({metin: metin.trim()});

        await yeniGorev.save();

        res.status(201).json({id:yeniGorev._id, metin: yeniGorev.metin});
    }

    catch(error){
        res.status(500).json({hata: "Görev eklenirken hata oluştu"});
    }
} );



app.delete('/api/todos/:id', async (req, res) =>{

    const {id} = req.params;
   
    try{
        const silinecekGorev = await Gorev.findByIdAndDelete(id);
        
        if(!silinecekGorev){
            return res.status(404).json({hata: "Silinecek görev bulunamadı"});
        }
        res.status(200).json({mesaj: "Görev silindi"});
    }
    catch(error){
        res.status(500).json({hata:"Görev silinirken hata oluştu"});
    }
});

app.listen(PORT, () =>{
    console.log(`Backend sunucusu http://localhost:${PORT} üzerinde çalışıyor`);
});

