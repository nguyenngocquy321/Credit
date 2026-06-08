# 🚀 Dự án Credit System

Hệ thống quản lý dịch vụ Credit toàn diện, bao gồm cả Backend (API) và Frontend (Dashboard quản trị).

---

## 🛠 Công nghệ sử dụng

### 1. Backend (API)
- **Framework:** NestJS
- **Database:** PostgreSQL (TypeORM)
- **Security:** JWT (Passport-JWT), Redis (Blacklist)
- **Container:** Docker & Docker Compose

### 2. Frontend (Client)
- **Framework:** React
- **State Management:** Zustand
- **Styling:** Tailwind CSS

---

## 📁 Cấu trúc dự án
```text
/root
├── backend/            # NestJS API
│   ├── src/
│   │   ├── decorators/ # Custom decorators (@Roles)
│   │   ├── guards/     # JwtAuthGuard, RolesGuard
│   │   └── modules/    # auth, users, package
├── frontend/           # Client Application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── services/   # Axios API calls
│   │   └── store/      # Global state
└── docker-compose.yml  # Triển khai cả hệ thống
