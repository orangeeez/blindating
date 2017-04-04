using Blindating.Models.Tables;
using Blindating.Models.Interfaces;
using Blindating.Models.Tables.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface ISearchRepository {
        Task<IEnumerable<User>> SearchUsers(string JWT, SearchData searchData);
        //string Test();
    }
}
