using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Photo : IBaseModel
    {
        public int ID { get; set; }
        public int InformationPhotoFK { get; set; }
        public string Path { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public virtual Information Information { get; set; }
        [NotMapped] public int UserID { get; set; }
        [NotMapped] public int PhotoID { get; set; }
    }
}
