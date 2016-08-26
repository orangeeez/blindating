using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Objects;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public static class Utils
    {
        public class Country
        {
            public int ID { get; set; }
            public string Abr { get; set; }
            public string En { get; set; }
        }

        public class City
        {
            public int ID { get; set; }
            public string Abr { get; set; }
            public string En { get; set; }
        }
    }
}
