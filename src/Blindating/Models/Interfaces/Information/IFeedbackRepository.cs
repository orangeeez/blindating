using Blindating.Models.Tables;
using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IFeedbackRepository : IBaseRepository<Feedback>
    {
        Task<IEnumerable<Feedback>> GetAllByID(int userID);
        Task<int> AddOther(Feedback feedback);
    }
}
