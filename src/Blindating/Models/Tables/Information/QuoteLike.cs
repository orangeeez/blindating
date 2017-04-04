using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class QuoteLike
    {
        public QuoteLike() { }
        public QuoteLike(QuoteLike qlike)
        {
            Result = qlike.Result;
            RemoteUserID = qlike.RemoteUserID;
            Message = qlike.Message;
        }
        public int ID { get; set; }
        public int QuoteLikeFK { get; set; }
        public int RemoteUserID { get; set; }
        public bool Result { get; set; }
        public string Direction { get; set; }
        public string Message { get; set; }
        public virtual Quote Quote { get; set; }

        [NotMapped] public Quote UpdateQuote { get; set; }
    }
}
