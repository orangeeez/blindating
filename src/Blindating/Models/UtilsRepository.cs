using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public class UtilsRepository : IUtilsRepository
    {
        private readonly AppDBContext _appDB;

        public UtilsRepository(AppDBContext _appDB)
        {
            this._appDB = _appDB;
        }
    }
}
