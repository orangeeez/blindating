using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables.Location
{
    public class Country : IBaseModel
    {
        public int ID { get; set; }
        public string Abr { get; set; }
        public string En { get; set; }
    }
}
