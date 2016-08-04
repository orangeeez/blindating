using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public static class UserUtils
    {
        public class FindUser
        {
            public string Field { get; set; }
            public string Value { get; set; }
        }

        public class Quote
        {
            public int ID { get; set; }
            public int InformationFK { get; set; }

            public string Author { get; set; }
            public string Content { get; set; }

            public virtual InformationUser Information { get; set; }

            [NotMapped]
            public int UserID { get; set; }
        }
    }
}
