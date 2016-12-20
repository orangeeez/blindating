using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using NetCoreAngular2.Models.Tables.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface ISearchRepository {
        Task<IEnumerable<User>> SearchUsers(SearchData searchData);
    }
}
