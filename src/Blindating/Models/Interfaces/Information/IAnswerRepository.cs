using Blindating.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    interface IAnswerRepository
    {
        bool SetAnswer(Answer answer);
    }
}
