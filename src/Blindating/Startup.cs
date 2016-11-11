using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Blindating.Models;
using Microsoft.EntityFrameworkCore;
using Blindating.Models.Interfaces;
using Blindating.Models.Repositories;
using NetCoreAngular2.Models;

namespace Blindating
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }
        public IConfigurationRoot Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddSingleton<IUserRepository,         UserRepository>();
            services.AddSingleton<IQuoteRepository,        QuoteRepository>();
            services.AddSingleton<IPreferenceRepository,   PreferenceRepository>();
            services.AddSingleton<IQuestionRepository,     QuestionRepository>();
            services.AddSingleton<IPhotoRepository,        PhotoRepository>();
            services.AddSingleton<IDetailRepository,       DetailRepository>();
            services.AddSingleton<IFeedbackRepository,     FeedbackRepository>();
            services.AddSingleton<IConversationRepository, ConversationRepository>();

            services.AddMvc();
        }
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, AppDBContext _context)
        {
            //DbInitializer.Initialize(_context);
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
