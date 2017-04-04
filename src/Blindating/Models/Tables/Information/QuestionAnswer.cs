using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class QuestionAnswer
    {
        public QuestionAnswer() { }
        public QuestionAnswer(QuestionAnswer answer)
        {
            QuestionAnswerFK = answer.QuestionAnswerFK;
            Result           = answer.Result;
            RemoteUserID     = answer.RemoteUserID;
            Direction        = answer.Direction;
            QuestionAnswered = answer.QuestionAnswered;
        }
        public int ID { get; set; }
        public int QuestionAnswerFK { get; set; }
        public int RemoteUserID { get; set; }
        public bool Result { get; set; }
        public string Direction { get; set; }

        public virtual Question Question { get; set; }
        [NotMapped] public User RemoteUser { get; set; }
        [NotMapped] public string QuestionAnswered { get; set; }
        [NotMapped] public int InformationQuestionFK { get; set; }
        [NotMapped] public int RemoteInfoQuestionFK { get; set; }
    }
}
