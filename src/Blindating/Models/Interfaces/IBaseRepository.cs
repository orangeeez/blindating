using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Interfaces
{
    public interface IBaseRepository<T> where T: class, IBaseModel, new()
    {
        Task<IEnumerable<T>> GetAll();
        Task<int> Add(T entity);    
        Task<bool> Remove(T entity);
        Task<bool> Update(T entity);
    }
}
