using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class Answer
    {
        public int ID { get; set; }
        public int QuestionAnswerFK { get; set; }
        public int RemoteUserID { get; set; }
        public bool Result { get; set; }
        public virtual Question Question { get; set; }

        [NotMapped]
        public int UserID { get; set; }
        [NotMapped]
        public int AnswerID { get; set; }

        // TODO Necessity of this field
        [NotMapped]
        public string Message { get; set; }
    }
}
