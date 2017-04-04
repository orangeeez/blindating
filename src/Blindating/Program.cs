using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using System.Security.Cryptography.X509Certificates;

namespace Blindating
{
    public class Program
    {
        public static string LaunchType = "none";
        public static string IPAddress = "http://localhost:8000"; 
        public static void Main(string[] args)
        {
            if (args.Length != 0) LaunchType = args[0];

            if (LaunchType == "docker-local" || 
                LaunchType == "docker-remote")
                IPAddress = "http://blindating:8000";

            var host = new WebHostBuilder()
                .UseKestrel(options =>
                {
                    //options.UseHttps(new X509Certificate2(Directory.GetCurrentDirectory() + "/blindating.pfx", "f00tBall"));
                })
                .UseUrls(IPAddress)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
