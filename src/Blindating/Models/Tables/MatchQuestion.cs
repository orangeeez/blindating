using Blindating.Models.Interfaces;
using NetCoreAngular2.Models.Tables;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class MatchQuestion : IBaseModel
    {
        public int ID { get; set; }
        public string Category { get; set; }
        public string Text { get; set; }
        [NotMapped] public bool IsAnswered { get; set; }
        [NotMapped] public bool IsCoincided { get; set; }
        [NotMapped] public int MatchAnswerID { get; set; }

        public MatchQuestion() { }
        public MatchQuestion(MatchQuestion mq, int matchAnswerID)
        {
            this.ID = mq.ID;
            this.Category = mq.Category;
            this.Text = mq.Text;
            this.MatchAnswers = mq.MatchAnswers;
            this.IsAnswered = true;
            this.MatchAnswerID = matchAnswerID;
        }

        public List<UserMatchQuestion> UserMatchQuestions { get; set; }
        public List<MatchAnswer> MatchAnswers { get; set; }
    }
}
