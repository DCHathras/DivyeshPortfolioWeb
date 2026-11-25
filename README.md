# DivyeshPortfolioWeb
# 👋 Divyesh Singh | .NET Full Stack Developer

### Building Scalable Web Applications | ASP.NET Core | C# | Azure | Generative AI

Welcome to my personal developer portfolio repository!

I am a passionate **.NET Full Stack Developer** with around 4 years of experience in designing, developing, integrating, and optimizing enterprise-grade web applications, RESTful APIs, and AI-powered solutions.

I enjoy solving complex technical problems, exploring emerging technologies, and building scalable, secure, and performance-oriented applications.

---

## 🚀 About Me

- 💻 .NET Full Stack Developer specializing in C# and ASP.NET Core.
- ☁️ Interested in Cloud Computing, Microsoft Azure, and DevOps.
- 🤖 Exploring Generative AI, LLMs, RAG, and AI-powered applications.
- 🏗️ Experienced in REST APIs, MVC architecture, and database optimization.
- 🔐 Interested in Cybersecurity, secure coding, and application security.
- 📚 Passionate about continuous learning and exploring new technologies.

## 🛠️ Technical Skills

| Category | Technologies |
|---|---|
| Programming Languages | C#, JavaScript, TypeScript, SQL |
| Backend | ASP.NET Core, .NET 6/8/10, Web API, MVC, Entity Framework Core |
| Frontend | Angular, React, HTML5, CSS3, Bootstrap |
| Databases | SQL Server, MySQL, MongoDB, Cosmos DB |
| Cloud & DevOps | Microsoft Azure, Azure DevOps, Docker, Kubernetes |
| Architecture | Clean Architecture, SOLID, CQRS, Design Patterns |
| AI & Generative AI | OpenAI APIs, Azure OpenAI, RAG, Semantic Search | Cyber Security and CVE Analysis
| Tools | Git, GitHub, Visual Studio, VS Code |

## 🌟 Portfolio Highlights

This portfolio is designed to showcase:

- Professional introduction and developer profile.
- Technical skills and technology expertise.
- Professional experience and achievements.
- Software development projects.
- Contact information and professional links.

## 🏗️ Tech Stack

This portfolio is built using:

- **ASP.NET Core 8 MVC**
- **C#**
- **HTML5 / CSS3 / JavaScript**
- **Bootstrap** (if used)
- **Docker** for containerization
- **Git & GitHub** for version control

## 💻 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- .NET 8 SDK
- Visual Studio 2022 or later / VS Code
- Git

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/DivyeshPortfolioWeb.git
```

### Navigate to Project Directory

```bash
cd DivyeshPortfolioWeb
```

### Restore Dependencies

```bash
dotnet restore
```

### Run Application

```bash
dotnet run
```

Open the local URL displayed in your terminal.

## 🐳 Run with Docker

Build Docker Image:

```bash
docker build -t divyesh-portfolio .
```

Run Docker Container:

```bash
docker run -d -p 10000:10000 --name divyeshportfolio divyesh-portfolio
```

Open:

```text
http://localhost:10000
```

## ☁️ Deploy to Render

Create a Render **Web Service**, connect this repository, select **Docker**, and use the root `Dockerfile`. The container listens on Render's `PORT` environment variable (default `10000`); the application handles the platform's HTTPS-terminating proxy without redirect loops. The `/` route can be used as the health check path.

Render's managed load balancer distributes requests across all running instances. A single instance (including the Free plan) does not provide horizontal load balancing; multiple instances require a paid compute plan. Render autoscaling requires a Pro workspace. Scaling is configured for the Render service, not implemented as a custom in-process balancer.

The Docker image uses a multi-stage .NET 8 Alpine build and runs as the non-root `app` user.

## 📫 Connect With Me

- **GitHub:** https://github.com/DCHathras
- **LinkedIn:** https://www.linkedin.com/in/divyesh-singh-464160137/

---

## 🎯 My Development Philosophy

> Learn continuously. Build intelligently. Write clean code. Solve real-world problems.

I believe in continuous improvement, knowledge sharing, and using technology to create meaningful solutions.

⭐ If you find my work interesting, feel free to explore my repositories and connect with me!

**Developed with ❤️ by Divyesh Singh**
