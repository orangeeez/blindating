using Blindating.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Quote : IBaseModel
    {
        public Quote()
        {
            this.QuoteLikes = new List<QuoteLike>();
        }
        public int ID { get; set; }
        public int InformationQuoteFK { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public int Up { get; set; }
        public int Down { get; set; }
        public virtual Information Information { get; set; }

        // ================== MANY TO MANY RELATIONSHIPS EXAMPLE ==================
        //public List<QLike> QLike { get; set; }

        [JsonIgnore] public virtual List<QuoteLike> QuoteLikes { get; set; }
        [NotMapped] public bool IsAnswered { get; set; }
        [NotMapped] public bool IsLike { get; set; }
        [NotMapped] public bool IsDislike { get; set; }
    }
}
