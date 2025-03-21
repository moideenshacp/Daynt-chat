# Next.js + MUI Real-Time Chat Application

This project is a real-time online chat application built using **Next.js, MUI (Material-UI), TypeScript, WebSockets (Socket.io), and MongoDB**. It features real-time messaging, user authentication, connected users list, and file-sharing capabilities.

## 🚀 Features
- **User Authentication** (Sign-up, Sign-in)
- **Real-time Messaging** with WebSockets
- **Connected Users List** in the Sidebar
- **File Sharing** (Upload & Send files)
- **Message Storage** in MongoDB
- **Responsive UI** with MUI and Tailwind CSS
- **Backend Structured with MVC Pattern**

## 📂 Project Structure
```
root/
│── server/                  # Express.js Backend (Node.js)
│   ├── controllers/          # Business Logic
│   ├── models/               # Mongoose Models
│   ├── routes/               # API Endpoints
│   ├── services/             # Service Layer
│   ├── config/               # Configurations
│   ├── app.ts                  
├   ├── server.ts             # Entry Point
├   ├── utils
│
│── client/                 # Next.js Frontend
│   ├── components/           # Reusable UI Components
│   ├── context/              # Context API (Socket, Auth)
│   ├── app/                # Next.js Pages
│   ├── redux/                # Redux Store & Slices
│   ├── styles/               # Global Styles
│   ├── interface/                # TypeScript Interfaces
│   ├── next.config.js        # Next.js Configurations
│   ├── package.json          # Dependencies
```

## 🛠️ Technologies Used
### **Frontend:**
- **Next.js** (App Router)
- **TypeScript**
- **MUI (Material-UI)**
- **Tailwind CSS**
- **Redux Toolkit**
- **Socket.io (Client)**

### **Backend:**
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **Socket.io (Server)**
- **JWT Authentication**

## 🚀 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/moideenshacp/Daynt-chat.git
```

### **2️⃣ Backend Setup**
```sh
cd server
npm install
```
#### **Environment Variables (`.env` file in backend/)**
```
PORT=your port
MONGO_URI=mongo uri
JWT_SECRET=your_secret_key
FRONT_URL=http://localhost:3000
```
Run the backend server:
```sh
npm start
```

### **3️⃣ Frontend Setup**
```sh
cd client
npm install
```
#### **Environment Variables (`.env.local` file in frontend/)**
```
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_NAME=cloudinary name
NEXT_PUBLIC_UPLOAD_PRESET=upload preset
```
Run the frontend:
```sh
npm run dev
```

## 🔥 Usage
1. Sign up & sign in with your credentials.
2. Start real-time messaging.
3. See connected users in the sidebar.
4. Upload and share files with users.


## ⚡ API Endpoints
### **Auth Routes**
| Method | Endpoint      | Description         |
|--------|-------------|---------------------|
| POST   | `/api/auth/signup`  | Register a new user |
| POST   | `/api/auth/login`   | Login user |

### **Chat Routes**
| Method | Endpoint      | Description         |
|--------|-------------|---------------------|
| GET    | `/api/chat/fetchMessage`  | Fetch chat history |


## 🤝 Contributing
1. Fork the repository
2. Create a new feature branch: `git checkout -b feature-xyz`
3. Commit your changes: `git commit -m 'Add feature xyz'`
4. Push the branch: `git push origin feature-xyz`
5. Open a Pull Request

## 📜 License
This project is **MIT Licensed**. Feel free to use and modify it as needed.

---
💡 **Happy Coding!** 🎉

