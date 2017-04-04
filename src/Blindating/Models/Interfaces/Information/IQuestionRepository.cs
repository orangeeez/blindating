using Blindating.Models.Tables;
using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IQuestionRepository : IBaseRepository<Question>
    {
        Task<IEnumerable<Question>> GetAllByID(string JWT, int userID);
        Task<IEnumerable<Question>> GetNotAnsweredByID(string JWT, int userID); 
        Task<bool> SetAnswer(QuestionAnswer answer);
    }
}
