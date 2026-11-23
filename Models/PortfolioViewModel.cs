namespace KubernetesHustle.Models
{
    public class PortfolioViewModel
    {
        public string Name { get; set; } = "Divyesh Singh";

        public string Designation { get; set; } =
            ".NET AI Developer";

        public string Description { get; set; } =
            "I build intelligent applications using .NET, " +
            "Artificial Intelligence and modern cloud technologies.";

        public string Email { get; set; } =
            "chaudharyhathras33@gmail.com";

        public string Location { get; set; } =
            "India";

        public List<string> Skills { get; set; } = new()
                                                          {
                                                              "C#",
                                                              "ASP.NET Core MVC",
                                                              ".NET Web API",
                                                              "Python",
                                                              "Machine Learning",
                                                              "Generative AI",
                                                              "LLM Integration",
                                                              "RAG",
                                                              "SQL Server",
                                                              "Docker",
                                                              "Linux",
                                                              "Git"
                                                          };

        public List<ProjectInfo> Projects { get; set; } = new()
       {
        new ProjectInfo
        {
            Title = "AI Chatbot",
            Description = "Intelligent chatbot using ASP.NET Core and LLM APIs.",
            Technology = "ASP.NET Core, C#, OpenAI API, Javascript, JQuery, Azure Cognitive Services, Virtual Machine, Azure App Service, Azure SQL Database"
        },

        new ProjectInfo
        {
            Title = "Hybrid RAG Application",
            Description = "Document-based AI question answering application using PDF files and Images",
            Technology = ".NET, LangChain.NET, Vector Databases, OKF, CAG"
        },

        new ProjectInfo
        {
            Title = "Cost Optimization for REST and Restful APIs",
            Description = "AI-powered REST API with secure backend architecture and background jobs for cost optimization.",
            Technology = "ASP.NET Core Web API + MVC, CI/CD, Code-First Approach, DB-First Approach, EF Core, Hangfire, Quartz.NET, Jwt Authentication"
        },

        new ProjectInfo
        {
            Title = "Dockerized AI Application using Kubernetes",
            Description = "Containerized .NET application for Linux deployment.",
            Technology = "Docker, Linux, Portainer, Acrane-Docker Management UI"
        },

        new ProjectInfo
        {
            Title = "Music Player",
            Description = "A simple music player application built with .NET.",
            Technology = "C#, .Net Framework, Windows Forms"
        },

        new ProjectInfo
        {
            Title = "Used Kali + Parrot OS for Ethical Security Testing using VirtualBox",
            Description = "Conducted ethical security testing and penetration testing using Kali Linux and Parrot OS in a virtualized environment.",
            Technology = "Linux , Ettercap, Bettercap, Nmap, Metasploit, Wireshark, Burp Suite,StagHider, Hydra, John the Ripper, Aircrack-ng, OWASP ZAP, Nikto, OpenVAS, Social Engineering Toolkit (SET), Maltego, Hashcat, Netcat, Snort, Tcpdump"
        },

        new ProjectInfo
        {
            Title = "Created Angular based Front End + Dashboard",
            Description = "Developed a responsive web application using Angular for the frontend and implemented a comprehensive dashboard for data visualization.",
            Technology = "Angular, TypeScript, HTML, CSS, Bootstrap, Node.js, RXJS, Chart.js, SVN , Git"
        }

    };
}

    public class ProjectInfo
    {
        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public string Technology { get; set; } = "";
    }
}
