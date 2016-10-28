using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Quote : IBaseModel
    {
        public int ID { get; set; }
        public int InformationQuoteFK { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public int Up { get; set; }
        public int Down { get; set; }
        public virtual Information Information { get; set; }

        [NotMapped] public int UserID { get; set; }
        [NotMapped] public int QuoteID { get; set; }
    }
}
