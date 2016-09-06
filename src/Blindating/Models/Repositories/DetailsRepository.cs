using Microsoft.Data.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public class DetailsRepository : IDetailsRepository
    {
        public UserUtils.Detail GetDetails(int userID)
        {
            using (var _appDB = new AppDBContext())
            {
                var user = (from u in _appDB.Users.Include(u => u.Information).ThenInclude(i => i.Detail)
                            where u.ID == userID
                            select u).SingleOrDefault();
                var details = user.Information.Detail;
                return details;
            }
        }
    }
}
