using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables.Utils
{
    [NotMapped]
    public class SearchUserData
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public List<User> Users { get; set; }
    }
}
