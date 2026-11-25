
var builder = WebApplication.CreateBuilder(args);

// Render dynamically assigns the PORT environment variable.
var portValue = Environment.GetEnvironmentVariable("PORT");

if (!string.IsNullOrWhiteSpace(portValue))
{
    if (!int.TryParse(portValue, out var port) || port < 1 || port > 65535)
    {
        throw new InvalidOperationException(
            "PORT must be a valid TCP port between 1 and 65535.");
    }

    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Render terminates SSL at its proxy and forwards HTTP to the application.
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
