using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IPreferenceRepository : IBaseRepository<Preference>
    {
        Task<IEnumerable<string>> GetCities(string country);
        Task<Preference> GetAllByID(int userID);
    }
}
