using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular2.Models.Tables
{
    public class MatchAnswer : IBaseModel
    {
        public int ID { get; set; }
        public int MatchQuestionFK { get; set; }
        public string Text { get; set; }
        [JsonIgnore] public MatchQuestion MatchQuestion { get; set; }
    }
}
