using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ASPAngular2Test.Models;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ASPAngular2Test
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();

            if (env.IsEnvironment("Development"))
                builder.AddApplicationInsightsSettings(developerMode: true);

            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IOnelineUserRepository, UserRepository>();
            services.AddSingleton<IUtils, UserRepository>();
            services.AddMvc();
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<AppDBContext>(options =>
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"] + "MultipleActiveResultSets=True"));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();
            app.UseApplicationInsightsExceptionTelemetry();

            app.UseIISPlatformHandler();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc();
        }

        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
