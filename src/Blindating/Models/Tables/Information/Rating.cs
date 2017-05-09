using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Rating : IBaseModel
    {
        public int ID { get; set; }
        public int InformationRatingFK { get; set; }
        public float Grade { get; set; }
        public int Count { get; set; }

        public virtual Information Information { get; set; }

        [NotMapped] public bool IsFirst { get; set; }
        [NotMapped] public bool IsLast { get; set; }
    }
}
