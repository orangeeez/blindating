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
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Blindating.Controllers.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Blindating.Models.Repositories.Search;

namespace Blindating
{
    public class Startup
    {
        const string TokenAudience     = "Audience";
        const string TokenIssuer       = "Issuer";
        private const string SecretKey = "needtogetthisfromenvironment";
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
        private TokenAuthOptions tokenOptions;
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
            tokenOptions = new TokenAuthOptions()
            {
                Audience = TokenAudience,
                Issuer = TokenIssuer,
                SigningKey = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256)
        };

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
            services.AddSingleton<ISearchRepository,       SearchRepository>();
            services.AddSingleton<INotificationRepository, NotificationRepository>();


            services.AddMvc();

            // TODO Cors fo testing
            services.AddCors();

            services.AddSingleton(tokenOptions);

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                    .RequireAuthenticatedUser().Build());
            });
        }
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, AppDBContext _context)
        {
            //DbInitializer.Initialize(_context);
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = TokenIssuer,

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = TokenAudience,

                // Validate the token expiry
                ValidateLifetime = false,
            };

            // TODO Cors fo testing
            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials());

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = tokenValidationParameters
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
