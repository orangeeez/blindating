using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using Blindating.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Repositories
{
    public class PhotoRepository : BaseRepository<Photo>, IPhotoRepository
    {
        private AppDBContext _context;
        public PhotoRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Photo>> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Photos)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return user.Information.Photos;
            }
        }
        public async Task<Photo> GetLast(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Photos)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();
                return user.Information.Photos.LastOrDefault();
            }
        }

        public async Task<IEnumerable<Photo>> GetLastCount(dynamic data)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                int userID = data.userID;
                int count = data.count;
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Photos)
                        .Where(u => u.ID == userID)
                        .SingleOrDefaultAsync();

                return user.Information.Photos.OrderByDescending(p => p.ID)
                                              .Take(count);
            }
        }
        public async Task<string> AddByJWT(string JWT, Image image, string path, string uploader)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                if (uploader == "basic") {
                    User user = await _context.Users
                        .Where(u => u.JWT == JWT)
                        .SingleOrDefaultAsync();

                    user.Image = path;

                    _context.Users.Update(user);
                }

                else
                {
                    int informationFK = await _context.Users.Include(u => u.Information)
                            .Where(u => u.JWT == JWT)
                            .Select(u => u.Information.ID)
                            .SingleOrDefaultAsync();

                    _context.Photos.Add(new Photo
                    {
                        Width = image.Width,
                        Height = image.Height,
                        InformationPhotoFK = informationFK,
                        Path = path
                    });
                }
                await _context.SaveChangesAsync();
                return path;
            }
        }
    }
}
