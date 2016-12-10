using NetCoreAngular2.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Question : IBaseModel
    {
        public Question()
        {
            this.Answers = new List<Answer>();
        }
        public int ID { get; set; }
        public int InformationQuestionFK { get; set; }
        public string Message { get; set; }
        public virtual Information Information { get; set; }

        [JsonIgnore] public virtual List<Answer> Answers { get; set; }
        [NotMapped] public int UserID { get; set; }
        [NotMapped] public int QuestionID { get; set; }
        [NotMapped] public bool Answered { get; set; }
    }
}
