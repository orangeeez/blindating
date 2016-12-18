using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IQuoteRepository : IBaseRepository<Quote>
    {
        Task<IEnumerable<Quote>> GetAllByID(string JWT, int userID);
        Task<bool> SetLike(QuoteLike qlike);
    }
}
