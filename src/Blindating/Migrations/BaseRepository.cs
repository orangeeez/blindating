using Blindating.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Blindating.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Blindating.Models.Tables;

namespace Blindating.Models.Repositories
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
        public async Task<User> GetBy(dynamic condition)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                string field = condition.field;
                string value = condition.value;
                User user = null;
                switch (field)
                {
                    case "JWT":
                        user = await _context.Users.Include(u => u.Information).FirstOrDefaultAsync(u => u.JWT == value);
                        break;
                    case "ID":
                        user = await _context.Users.Include(u => u.Information).FirstOrDefaultAsync(u => u.ID == int.Parse(value));
                        break;
                    case "InformationID":
                        user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Conversations).FirstOrDefaultAsync(u => u.Information.ID == int.Parse(value));
                        break;
                }
                return user;
            }
        }
    }
}
