using Blindating.Models.Interfaces;
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
            this.QuestionAnswers = new List<QuestionAnswer>();
        }
        public int ID { get; set; }
        public int InformationQuestionFK { get; set; }
        public string Message { get; set; }
        public virtual Information Information { get; set; }

        [JsonIgnore] public virtual List<QuestionAnswer> QuestionAnswers { get; set; }
        [NotMapped] public bool Answered { get; set; }
        [NotMapped] public int AnswersCount { get; set; }
        [NotMapped] public bool IsFirst { get; set; }
        [NotMapped] public bool IsLast { get; set; }
    }
}
