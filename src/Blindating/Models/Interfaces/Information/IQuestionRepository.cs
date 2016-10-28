using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IQuestionRepository : IBaseRepository<Question>
    {
        Task<IEnumerable<Question>> GetAllByID(int userID);
    }
}
