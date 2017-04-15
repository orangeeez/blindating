using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Tables
{
    public class UserMatchQuestion
    {
        public int UserID { get; set; }
        public int MatchQuestionID { get; set; }
        public int MatchAnswerID { get; set; }
        [JsonIgnore] public User User { get; set; }
        [JsonIgnore] public MatchQuestion MatchQuestion { get; set; }
    }
}
