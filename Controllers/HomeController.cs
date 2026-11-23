using KubernetesHustle.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace KubernetesHustle.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {

            var model = new PortfolioViewModel();
            return View(model);
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Skills()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View(new PortfolioViewModel());
        }

        public IActionResult Contact()
        {
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
