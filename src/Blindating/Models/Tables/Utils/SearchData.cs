using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular2.Models.Tables.Utils
{
    [NotMapped]
    public class SearchData
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public List<User> Users { get; set; }
    }
}
