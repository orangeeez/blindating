using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IMatchQuestionRepository : IBaseRepository<MatchQuestion>
    {
        Task<List<MatchQuestion>> GetAllOverriden();
        Task<List<MatchQuestion>> GetAllByID(int userID);
        Task<List<MatchQuestion>> GetMatchedWith(int remoteUserID, string JWT);
        void AddOverriden(MatchQuestion matchQuesiton, string JWT);
        void Answer(MatchQuestion matchQuestion, string JWT);
    }
}
