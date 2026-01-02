# Study2Success - EdTech Learning Platform <img src="https://github.com/skeshavthalwal155/Study2Success/raw/main/frontend/src/assets/Logo.png" style="float:right;" width="100" height="100" alt="Study2Success Logo">

## 📚 Project Overview

**Study2Success** is a comprehensive EdTech platform built to revolutionize online learning by providing a seamless, interactive, and accessible educational experience. This full-stack web application empowers instructors to create, publish, and monetize educational content while enabling learners to access high-quality courses, track progress, and engage in peer discussions.

Developed as a BCA (Bachelor of Computer Application) final year project at Modern Institute of Technology, Rishikesh, this platform addresses common e-learning challenges such as fragmented content, lack of interactivity, and high costs.

## 🚀 Live Demo
- **Platform URL:** [https://study2success.vercel.app](https://study2success.vercel.app)
- **Backend API:** Hosted separately (MongoDB + Node.js)

## ✨ Key Features

### 👨‍🎓 For Students/Learners
- **Interactive Learning Experience** – Engaging content with videos, notes, and coding exercises
- **Personalized Learning Paths** – Courses tailored to different skill levels (beginner to advanced)
- **Progress Tracking** – Monitor course completion and learning milestones
- **Community & Peer Reviews** – Read ratings and reviews before enrolling in courses
- **Gamification** – Educational games (Snake, Memory Match, Tic Tac Toe) to reinforce learning
- **Certificate Download** – Receive certificates upon course completion
- **Secure Payment** – Integrated Razorpay payment gateway

### 👨‍🏫 For Instructors/Educators
- **Global Reach** – Share knowledge with students worldwide
- **Easy Course Creation** – Intuitive interface for uploading courses and study materials
- **Monetization Opportunities** – Earn revenue by offering premium courses
- **Course Management** – Create, edit, publish, and manage courses with sections and subsections
- **Analytics Dashboard** – Track enrollments, revenue, and student engagement

### ⚙️ For Administrators
- **User Management** – View and manage all platform users
- **Category Management** – Add and organize course categories
- **Content Moderation** – Oversee all courses and content quality
- **Platform Analytics** – Comprehensive dashboard with platform statistics

## 🛠️ Technology Stack

### **Frontend**
- **React.js** – Component-based UI library
- **Tailwind CSS** – Utility-first CSS framework for responsive design
- **Redux** – State management
- **Axios** – HTTP client for API requests
- **React Router** – Navigation and routing
- **React Icons** – Comprehensive icon library
- **Swiper.js** – Touch slider for carousels
- **React Hot Toast** – Notification system

### **Backend**
        Study2Success/
        ├── backend/
        │ ├── config/ # Database, Cloudinary, Razorpay configurations
        │ ├── controllers/ # Business logic for all routes
        │ ├── middleware/ # Authentication and authorization middleware
        │ ├── models/ # MongoDB schemas (User, Course, Category, etc.)
        │ ├── routes/ # API route definitions
        │ ├── utils/ # Utility functions (file upload, mail sender)
        │ ├── .env # Environment variables
        │ └── index.js # Main server file
        ├── frontend/
        │ ├── src/
        │ │ ├── components/ # Reusable UI components
        │ │ │ ├── common/ # Shared components (Footer, Navbar, etc.)
        │ │ │ ├── core/ # Core feature components
        │ │ │ └── HomePage/ # Home page specific components
        │ │ ├── pages/ # Page components (Home, Login, Dashboard, etc.)
        │ │ ├── services/ # API connection utilities
        │ │ ├── slice/ # Redux state slices
        │ │ ├── utils/ # Helper functions and constants
        │ │ ├── App.jsx # Main application component
        │ │ └── index.css # Global styles with Tailwind
        │ ├── public/ # Static assets
        │ └── package.json
        └── README.md

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Cloud or local instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/skeshavthalwal155/Study2Success.git
cd Study2Success
```
2. **Backend Setup**
```bash
cd backend
npm install
```

**Create a ```.env``` file in the backend directory with:**
```env
PORT=4000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
```

3. **Frontend Setup**

```bash
cd ../frontend
npm install
```
Create a ```.env``` file in the frontend directory with:

```env
VITE_APP_BACKEND_URL=http://localhost:4000
```
4. **Run the Application**

```bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm run dev
```
```env
The application will be available at http://localhost:5173
```

## **🔐 Authentication & Authorization**
#### The platform implements role-based access control with three user types:
1. **Student** – Can enroll in courses, track progress, submit reviews
2. **Instructor** – Can create and manage courses, view analytics
3. **Admin** – Full platform access including user and category management

 Authentication features:
- Email/password registration with OTP verification
- JWT-based session management
- Password reset functionality
- Secure cookie-based token storage

## 💰 Payment Integration
- **Razorpay Integration** for secure course purchases
- One-time payment model for course enrollment
- Payment verification and enrollment automation
- Order creation, payment capture, and signature verification

## 🎨 UI/UX Features
- **Responsive Design** – Works seamlessly on mobile, tablet, and desktop
- **Dark/Light Mode** – User preference-based theme switching
- **Intuitive Navigation** – Clean layout with easy-to-use interface
- **Loading States** – Visual feedback for all asynchronous operations
- **Toast Notifications** – User action confirmations and error messages

## 📊 Database Schema
Key MongoDB collections:

- **Users** – User profiles with role-based permissions
- **Courses** – Course details, content, pricing, and enrollments
- **Categories** – Course categorization and organization
- **Sections & SubSections** – Course content structure
- **RatingAndReviews** – User feedback and course ratings
- **CourseProgress** – Student learning progress tracking
- **Payments** – Transaction records

## 🧪 Testing
The platform implements comprehensive testing:

- **Unit Testing** – Individual component validation
- **Integration Testing** – API endpoint and database interaction testing
- **Functional Testing** – User workflow validation
- **System Testing** – End-to-end platform testing

All test cases have passed successfully with no critical defects encountered.

## 🎯 Future Enhancements

1. **AI-Powered Features**
   - Personalized course recommendations
   - AI-based automated assessments
   - Chatbot for instant doubt resolution

2. **Advanced Learning Tools**
   - Live coding environments with real-time compilation
   - Offline mode for downloadable content
   - Peer programming sessions

3. **Platform Expansion**
   - Mobile applications (iOS & Android)
   - Multilingual support for regional languages
   - Corporate training modules
   - Blockchain-verified digital certificates

4. **Enhanced Collaboration**
   - Live pair-coding sessions
   - Mentorship programs with industry experts
   - Enhanced discussion forums

## 👥 Contributors
- Keshav Thalwal – Full Stack Developer & Project Lead
- Ayush Kukreti – Co-Frontend Developer
- Lakshya Kumar – Co-Developer
- Abhay Sharma – UI/UX Designer & Logo Design

## 📄 Documentation
For detailed implementation, refer to:

Project Report PDF – Complete documentation including flowcharts, ER diagrams, and code explanations

React Documentation

Node.js Documentation

MongoDB Documentation

Tailwind CSS Documentation

📝 License
This project is developed as an academic project for BCA final year submission at Modern Institute of Technology, Rishikesh (Affiliated to H.N.B. Garhwal University).

🤝 Acknowledgments
Special thanks to all faculty members of the Computer Science and Information Technology Department at Modern Institute of Technology, Rishikesh, for their continuous support and guidance throughout the project development.

"Empowering learners with quality education through technology"


