﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface ILocationRepository
    {
        List<string> GetCities(string country);
    }
}
