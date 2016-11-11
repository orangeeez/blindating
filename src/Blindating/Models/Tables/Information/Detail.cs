using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Detail : IBaseModel
    {
        public int ID { get; set; }
        public int InformationDetailsFK { get; set; }
        public string Firstname { get; set; }
        public DateTime BirthDate { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public string PrefferedLanguage { get; set; }
        public string AlsoSpeak { get; set; }
        public string RelationshipStatus { get; set; }
        public string SexualOrientation { get; set; }
        public string Work { get; set; }
        public string Education { get; set; }
        public string Ethnicity { get; set; }
        public string BodyType { get; set; }
        public string Height { get; set; }
        public string HairColor { get; set; }
        public string EyeColor { get; set; }
        public string IWear { get; set; }
        public string IHave { get; set; }
        public string ClothingStyle { get; set; }
        public string MyBestPart { get; set; }
        public string OverallAppearance { get; set; }

        public virtual Information Information { get; set; }

        [NotMapped]
        public int UserID { get; set; }
    }
}
