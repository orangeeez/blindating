using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public interface IDetailsRepository
    {
        UserUtils.Detail GetDetails(int userID);
    }
}
