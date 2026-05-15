# Student Portal

A modern full-stack Student Portal web application built to manage students, courses, attendance, assignments, and academic activities through a clean and responsive interface.
This  full-stack Student Portal built with **Django REST Framework** (backend) and **React** (frontend). Students can register, enroll in courses, track progress, and automatically receive certificates upon course completion.


## Live Demo

* Frontend Deployment: [https://student-portal-pz6q.vercel.app/](https://student-portal-pz6q.vercel.app/)
* Backend Deployment: [https://student-portal-quwi.onrender.com](https://student-portal-quwi.onrender.com)

---

## Features


* 🔐 **Authentication** — Secure login & registration with token refresh
- 📚 **Course Browsing** — Browse and enroll in 6 available courses
- 📊 **Progress Tracking** — Track lesson completion with real-time progress bars
- 🏆 **Auto Certificates** — Unique certificates generated automatically on course completion
- 📱 **Responsive Design** — Works on desktop and mobile
- 🌙 **Dark Modern UI** — Beautiful dark theme interface
- ⚙️ **Django Admin Panel** — Full admin panel for managing all data
- 📈 **Dashboard Stats** — Real-time statistics for enrolled, completed, and in-progress courses



## 📁 Project Structure

student-portal/
├── backend/                        # Django Backend
│   ├── api/                        # Main Django app
│   │   ├── models.py               # Course, Enrollment, Certificate models
│   │   ├── views.py                # API views & logic
│   │   ├── serializers.py          # DRF serializers
│   │   ├── urls.py                 # API URL routes
│   │   ├── admin.py                # Admin panel config
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py    # Sample courses seeder
│   ├── backend/
│   │   ├── settings.py             # Django settings
│   │   ├── urls.py                 # Root URL config
│   │   └── wsgi.py                 # WSGI config
│   ├── requirements.txt            # Python dependencies
│   └── manage.py                   # Django CLI
│
└── frontend/                       # React Frontend
└── src/
├── api/
│   └── axios.js            # Axios config & interceptors
├── context/
│   └── AuthContext.js      # Global auth state
├── components/
│   └── Layout.js           # Sidebar & main layout
├── pages/
│   ├── Login.js            # Login page
│   ├── Register.js         # Registration page
│   ├── Dashboard.js        # Stats dashboard
│   ├── Courses.js          # Browse & enroll courses
│   ├── MyCourses.js        # Track progress
│   └── Certificates.js     # View certificates
├── App.js                  # Routes & providers
└── App.css                 # Global dark theme styles





## Deployment

* Frontend: Vercel
* Backend: Render




## 🚀 Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/AmirSohel2023/student-portal.git
cd student-portal
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Mac/Linux

# Install dependencies
cd backend
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed sample courses
python manage.py seed_data

# Create admin user (optional)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```
✅ Backend runs at: **http://127.0.0.1:8000**

### 3. Frontend Setup
```bash
# Open new terminal
cd frontend
npm install
npm start
```
✅ Frontend runs at: **http://localhost:3001**

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register/` | Register new student | ❌ |
| POST | `/api/auth/login/` | Login & get JWT tokens | ❌ |
| POST | `/api/auth/refresh/` | Refresh access token | ❌ |

### Courses
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/courses/` | List all courses | ❌ |
| POST | `/api/enroll/<id>/` | Enroll in a course | ✅ |

### Student Dashboard
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/my-enrollments/` | Get enrolled courses | ✅ |
| PUT | `/api/progress/<id>/` | Update lesson progress | ✅ |
| GET | `/api/dashboard/stats/` | Get dashboard stats | ✅ |
| GET | `/api/certificates/` | Get earned certificates | ✅ |
| GET | `/api/profile/` | Get student profile | ✅ |
| PUT | `/api/profile/update/` | Update student profile | ✅ |

---

## 🌍 Deployment Guide

### Backend on Render.com
Root Directory:  backend
`Build Command:   pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate && python manage.py seed_data
Start Command:   gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`

Environment Variables on Render:
SECRET_KEY    = your-secret-key-here
DEBUG         = False
DATABASE_URL  = postgresql://....(auto-added by Render PostgreSQL)

### Frontend on Vercel.com
Root Directory:   frontend
Framework:        Create React App
Build Command:    npm run build
Output Directory: build



# Future Improvements

* Role-based authentication
* Real-time notifications
* Chat system
* Online exam module
* AI-based student analytics
* File upload system

---



## License

This project is licensed under the MIT License.



## Author

Developed by Amir Sohel Sarkar Masum .
