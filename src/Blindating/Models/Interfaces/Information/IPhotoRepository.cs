using Blindating.Models.Tables;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IPhotoRepository : IBaseRepository<Photo>
    {
        Task<IEnumerable<Photo>> GetAllByID(int userID);
        Task<Photo> GetLast(int userID);
        Task<IEnumerable<Photo>> GetLastCount(dynamic data);
        Task<string> AddByJWT(string JWT, Image image, string path, string uploader);
    }
}
