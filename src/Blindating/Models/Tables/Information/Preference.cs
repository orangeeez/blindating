using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Preference : IBaseModel
    {
        public int ID { get; set; }
        public int InformationPreferenceFK { get; set; }
        public string Gender { get; set; }
        public string Relationship { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Hcolor { get; set; }
        public string Ecolor { get; set; }
        public string Hobby { get; set; }
        public string Vkontakte { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Google { get; set; }

        public virtual Information Information { get; set; }

        [NotMapped]
        public int UserID { get; set; }
    }
}
