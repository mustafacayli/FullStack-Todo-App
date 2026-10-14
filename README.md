# 🚀 Full-Stack Görev Yöneticisi (MERN Stack)

Modern web teknolojileri kullanılarak geliştirilmiş, modüler mimariye sahip tam teşekküllü bir Görev Yöneticisi (Todo App) projesi. Bu proje, React (Vite) ile modern istemci tarafı yönetimini ve Node.js/Express/MongoDB ile güvenilir sunucu mimarisini tek bir çatı altında (Monorepo) birleştirmektedir.

## 🛠️ Kullanılan Teknolojiler

**Frontend (İstemci):**
* React (Vite)
* Hooks (useState, useEffect)
* Fetch API (Asenkron Veri Tüketimi)
* CSS (Modüler Tasarım)

**Backend (Sunucu):**
* Node.js & Express.js
* MongoDB Atlas (Bulut Veritabanı) & Mongoose (ODM)
* CORS & Dotenv (Ortam Değişkenleri Yönetimi)

## ✨ Öne Çıkan Özellikler

* **Single Responsibility Principle (SRP):** İstemci tarafında bileşenler (TodoInput, TodoItem) modüler olarak ayrılmış ve Props ile veri akışı tek yönlü (Unidirectional Data Flow) sağlanmıştır.
* **RESTful API Mimarisi:** Backend üzerinde standartlara uygun GET, POST ve DELETE endpoint'leri kurgulanmıştır.
* **Kalıcı Veri Depolama:** Veriler RAM veya LocalStorage yerine doğrudan asenkron (async/await) operasyonlarla MongoDB Atlas üzerinde saklanmaktadır.
* **Hata Yönetimi:** HTTP isteklerinde başarılı/başarısız (try-catch) durumlar yönetilip, istemci tarafında yükleniyor (loading) state'leri eklenmiştir.

## 📁 Proje Yapısı

```text
FullStack-Todo-App/
├── react-todo/         # Vite tabanlı React istemci uygulaması
└── todo-backend/       # Express tabanlı Node.js REST API sunucusu
```

## 🚀 Kurulum ve Çalıştırma (Geliştirici Ortamı)

Projeyi kendi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin. Sisteminizin hem frontend hem de backend sunucusuna ihtiyacı vardır.

### 1. Repoyu Klonlayın
```bash
git clone https://github.com/mustafacayli/FullStack-Todo-App.git
cd FullStack-Todo-App
```

### 2. Backend'i Başlatın
Yeni bir terminal sekmesi açın ve backend klasörüne geçin:
```bash
cd todo-backend
npm install
```
Aynı klasör (todo-backend) içine bir `.env` dosyası oluşturun ve MongoDB bağlantı metninizi ekleyin:
```env
MONGO_URI="mongodb+srv://<kullanici_adi>:<sifre>@<cluster>.mongodb.net/?retryWrites=true&w=majority"
```
Sunucuyu çalıştırın (Varsayılan port: 5000):
```bash
node server.js
```

### 3. Frontend'i Başlatın
Farklı bir terminal sekmesi açın ve frontend klasörüne geçin:
```bash
cd react-todo
npm install
```
Geliştirme sunucusunu çalıştırın:
```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

## 📡 API Uç Noktaları (Endpoints)

| Metod  | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/api/todos` | Veritabanındaki tüm görevleri getirir. |
| `POST` | `/api/todos` | Yeni bir görev ekler. (Body: `{ "metin": "Görev içeriği" }`) |
| `DELETE` | `/api/todos/:id` | Belirtilen ID'ye sahip görevi siler. |

---
*Bu proje, full-stack sistemlerin birbiriyle entegrasyonu, veritabanı yönetimi ve modern web geliştirme mimarilerini pratikte uygulamak amacıyla geliştirilmiştir.*