using Blindating.Models.Tables;
using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IDetailRepository : IBaseRepository<Detail>
    {
        Task<Detail> GetAllByID(int userID);
    }
}
