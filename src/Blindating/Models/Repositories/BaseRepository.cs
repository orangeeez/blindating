using Blindating.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NetCoreAngular2.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular2.Models.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class, IBaseModel, new()
    {
        private AppDBContext _context;
        public BaseRepository(AppDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            using (AppDBContext _context = new AppDBContext())
            {
                return await _context.Set<T>().ToListAsync();
            }
        }
        public async Task<int> Add(T entity)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                _context.Set<T>().Add(entity);
                await _context.SaveChangesAsync();
                return entity.ID;
            }
        }
        public async Task<bool> Remove(T entity)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> Update(T entity)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                _context.Set<T>().Update(entity);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}
