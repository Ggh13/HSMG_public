# HSMG (Health and Sports Management System)

A comprehensive fitness and training management platform that allows users to create, share, and track workout programs. The system includes user authentication, training program creation, progress tracking, achievements, social features, and detailed analytics.

## 🏆 Hackathon Project - "Идея. Код. Релиз"

This project was developed for the **"Идея. Код. Релиз"** student hackathon organized by the IT community of Moscow State University (MSU). The hackathon focuses on creating open source projects for education and developing digital services that simplify student life.

### About the Hackathon
- **Event**: "Идея. Код. Релиз" Student Hackathon
- **Dates**: April 19-20, 2025
- **Format**: Offline
- **Organizer**: IT community of Moscow State University
- **Focus**: Open source educational projects and digital services for students
- **Goal**: Create services that simplify the educational process and student life

According to [Codenrock's calendar of hackathons](https://codenrock.com/blog/kalendar-hakatonov-4-18-aprelya-2025-goda/), this hackathon brings together students to develop innovative digital solutions that can have a real impact on the educational experience.

### Our Solution
HSMG represents our team's vision for improving student health and fitness management through technology. By creating a comprehensive platform that combines workout planning, progress tracking, and social features, we aim to address the growing need for accessible fitness solutions in the student community.

## 👥 Team Members

Our diverse team combines expertise across frontend development, backend architecture, design, and machine learning to deliver a comprehensive fitness management solution.

### Team Composition
- **Тугов Денис Александрович** - Backend Developer & Tech Lead
  - Responsible for Go backend architecture, database design, and technical leadership
  - Expertise in system design, API development, and performance optimization

- **Бужор Роман Дмитревич** - Team Lead & Backend Developer  
  - Project management, backend development, and team coordination
  - Focus on project strategy, development workflow, and team collaboration

- **Усков Максим Алексеевич** - Frontend Developer
  - React frontend development, user interface implementation
  - Specialization in TypeScript, component architecture, and user experience

- **Чекаева Кира Вадимовна** - Frontend Developer
  - Frontend development, UI/UX implementation, and responsive design
  - Focus on user interaction, accessibility, and modern web technologies

- **Ахмадеева Галия Данисовна** - UI/UX Designer
  - User interface design, user experience research, and design systems
  - Responsible for visual design, prototyping, and design consistency

- **Сергеев Егор Алексеевич** - ML Engineer
  - Machine learning models, data analysis, and intelligent features
  - Expertise in recommendation systems, predictive analytics, and AI integration

## 🎯 Project Aims and Features

### Core Features
- **Training Program Management**: Create, update, and share custom workout programs
- **Progress Tracking**: Monitor workout progress with detailed exercise history
- **User Authentication**: Secure registration and login system with JWT tokens
- **Social Features**: Add friends, share programs, and rate/review workouts
- **Achievement System**: Track personal records and fitness milestones
- **Anthropometry Tracking**: Monitor body measurements and physical progress
- **Statistics & Analytics**: Comprehensive data visualization of training progress
- **Community Features**: Discover and follow other users' training programs

### User Capabilities
- Create detailed training programs with exercises, sets, and reps
- Track workout progress with weight and repetition logging
- Set and monitor personal achievement goals
- Browse and favorite community training programs
- Connect with other users and share workout experiences
- Analyze training data with comprehensive statistics

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 19 + TypeScript + Vite
  - State Management: MobX
  - Routing: React Router DOM
  - HTTP Client: Axios
  - Styling: Modern CSS with responsive design

- **Backend**: Go 1.23.5 with Gin framework
  - Authentication: JWT with secure password hashing
  - Databases: PostgreSQL + MongoDB (hybrid approach)
  - Cloud Storage: AWS S3 integration
  - Logging: Zap structured logging

### Detailed Technology Breakdown

#### Frontend Technologies

**React 19**
- Latest React version with improved performance and concurrent features
- Server Components support for better SSR capabilities
- Enhanced error boundaries and improved developer experience
- Automatic batching for better performance optimization
- New hooks like `useOptimistic` and `useActionState` for better UX

**TypeScript**
- Static typing for enhanced code reliability and maintainability
- Better IDE support with IntelliSense and refactoring capabilities
- Compile-time error detection reducing runtime issues
- Enhanced team collaboration through clear interface definitions
- Better API contract enforcement between frontend and backend

**Vite**
- Lightning-fast development server with Hot Module Replacement (HMR)
- Optimized build process using Rollup for production
- Native ES modules support for faster development
- Plugin ecosystem for easy integration with various tools
- Significantly faster than traditional bundlers like Webpack

**MobX**
- Reactive state management with simple, scalable state architecture
- Automatic derivations and reactions for efficient updates
- Less boilerplate compared to Redux
- Excellent performance with fine-grained reactivity
- Perfect for complex training program state management

**React Router DOM v7**
- Latest routing solution with improved nested routing
- Data loading capabilities with loaders and actions
- Better error handling and boundary management
- Type-safe routing with TypeScript integration
- Enhanced performance with route-based code splitting

**Axios**
- Promise-based HTTP client with request/response interceptors
- Automatic JSON parsing and request/response transformation
- Request and response cancellation capabilities
- Built-in protection against CSRF attacks
- Extensive browser and Node.js compatibility

#### Backend Technologies

**Go 1.23.5**
- High-performance compiled language with excellent concurrency support
- Strong static typing and memory safety
- Fast compilation and excellent standard library
- Goroutines and channels for efficient concurrent programming
- Cross-platform deployment with single binary distribution
- Excellent performance for API servers and microservices

**Gin Framework**
- Fastest HTTP web framework for Go with minimal memory allocation
- Middleware support for authentication, logging, and CORS
- JSON validation and binding with struct tags
- Group routing for organized API endpoint management
- Built-in recovery middleware for panic handling
- Excellent performance benchmarks compared to other Go frameworks

**PostgreSQL**
- ACID-compliant relational database with advanced features
- Excellent JSON support for hybrid data storage
- Advanced indexing capabilities for complex queries
- Strong consistency and reliability for critical user data
- Extensive ecosystem and community support
- Perfect for user authentication, relationships, and structured data

**MongoDB**
- Document-oriented NoSQL database for flexible data structures
- Horizontal scaling capabilities for large datasets
- Rich query language with aggregation framework
- Schema flexibility for evolving training program structures
- Excellent performance for read-heavy workloads
- Native JSON document storage perfect for complex training data

**JWT (JSON Web Tokens)**
- Stateless authentication mechanism reducing server memory usage
- Self-contained tokens with encoded user information
- Cross-domain authentication support
- Mobile-friendly authentication approach
- Scalable authentication without server session storage
- Industry-standard security with HMAC or RSA signatures

**bcrypt Password Hashing**
- Adaptive hash function designed for password storage
- Built-in salt generation preventing rainbow table attacks
- Configurable work factor for future-proofing against hardware advances
- Time-tested security algorithm used by major platforms
- Resistant to timing attacks and brute force attempts

**AWS S3**
- Highly durable object storage (99.999999999% durability)
- Virtually unlimited storage capacity for user media
- Global CDN integration for fast content delivery
- Versioning and lifecycle management for cost optimization
- Server-side encryption and access control
- RESTful API for seamless integration

**Zap Logging**
- High-performance structured logging library
- Configurable log levels and output formats
- JSON structured logging for better log analysis
- Minimal memory allocation and CPU overhead
- Integration with log aggregation systems
- Excellent performance benchmarks in Go ecosystem

### System Architecture
```
Frontend (React) ←→ REST API (Go/Gin) ←→ PostgreSQL (relational data)
                                      ↓
                                   MongoDB (training programs & progress)
                                      ↓
                                   AWS S3 (media storage)
```

### Database Design Strategy

**Hybrid Database Approach**
Our application uses a strategic combination of PostgreSQL and MongoDB to leverage the strengths of both SQL and NoSQL paradigms:

**PostgreSQL for Structured Data:**
- User accounts and authentication information
- User relationships (friends, follows)
- Training program metadata and statistics
- Achievement records and leaderboards
- Transactional data requiring ACID compliance

**MongoDB for Document Storage:**
- Complex training program structures with nested exercises
- Exercise progress tracking with variable data structures
- User-generated content and media metadata
- Flexible schemas for evolving fitness data models
- High-volume read operations for training program retrieval

**Benefits of Hybrid Approach:**
- **Performance Optimization**: Right tool for each data type
- **Scalability**: MongoDB scales horizontally for training data, PostgreSQL ensures consistency for critical data
- **Flexibility**: Schema evolution without complex migrations
- **Data Integrity**: ACID transactions for user data, eventual consistency for content
- **Query Optimization**: SQL for complex relational queries, MongoDB for document retrieval

### Containerization & Deployment

**Docker**
- Consistent development and production environments
- Simplified dependency management across different systems
- Isolated application containers for better security
- Easy scaling and orchestration capabilities
- Version control for infrastructure configurations

**Docker Compose**
- Multi-container application orchestration
- Development environment setup with single command
- Network isolation and service discovery
- Volume management for persistent data storage
- Environment variable management for different configurations

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Go 1.23+ (for local development)

### Quick Start with Docker

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd HSMG_public
   ```

2. **Start the application**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081
   - Backend Health: http://localhost:8080

### Local Development Setup

#### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Configure environment variables (create `.env` file):
   ```bash
   # Database configurations
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=hsmg
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB=hsmg
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   
   # AWS S3 Configuration (optional)
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   AWS_S3_BUCKET=your_bucket
   ```

4. Run the backend:
   ```bash
   go run cmd/main.go
   ```

#### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 📋 API Documentation

The backend provides a comprehensive REST API with the following main endpoints:

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User authentication

### Training Programs
- `GET /api/training_program/get/:id` - Get training program details
- `POST /api/training_program/add` - Create new training program
- `POST /api/training_program/update` - Update existing program

### User Management
- `GET /api/user_data/:id` - Get user profile
- `POST /api/update_user_data` - Update user profile
- `GET /api/get_authorized_user_data` - Get current user data

### Progress Tracking
- `POST /api/user_done_exercise` - Log completed exercise
- `POST /api/get_exercise_statistic/:id` - Get exercise statistics

### Social Features
- `POST /api/find_people` - Search for users
- `POST /api/add_friend/:id` - Add friend
- `POST /api/find_training` - Search training programs

### Achievements
- `GET /api/user_bests_exercises` - Get user's best performances
- `POST /api/create_achievement` - Create new achievement
- `GET /api/get_achievements/:id` - Get user achievements

For detailed API documentation with request/response schemas, see `backend/README.md`.

## 🔧 Development

### Project Structure
```
HSMG_public/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── modules/        # Feature modules
│   │   ├── api/            # API integration
│   │   └── app/            # App configuration
│   └── docker/             # Frontend Docker configuration
├── backend/                 # Go backend application
│   ├── cmd/                # Application entry point
│   ├── internal/           # Internal packages
│   │   ├── auth/          # Authentication logic
│   │   ├── user/          # User management
│   │   ├── training_constructor/ # Training program logic
│   │   └── config/        # Configuration management
│   ├── pkg/               # Shared packages
│   └── docker/            # Backend Docker configuration
└── docker-compose.yaml     # Docker orchestration
```

### Key Design Patterns
- **Clean Architecture**: Separation of concerns with handler→service→repository layers
- **Dependency Injection**: Loosely coupled components
- **Repository Pattern**: Database abstraction layer
- **Middleware**: Authentication and logging middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Check the backend API documentation in `backend/README.md`
- Review the frontend documentation in `frontend/README.md`

---

Built with ❤️ for the fitness community
