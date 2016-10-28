using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular2.Models.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private AppDBContext _context;
        public UserRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<dynamic> Register(User user)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                dynamic result = new ExpandoObject();
                if (await IsEmailExist(user.Email))
                {
                    result.Text = User.EMAIL_ALREADY_EXIST;
                    return result;
                }
                else
                {
                    user.JWT = Guid.NewGuid().ToString();
                    user.Information = new Information();
                    user.Information.Preference = new Preference();

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    result.Text = User.REGISTERED_SUCCESSFULLY;
                    result.JWT = user.JWT;
                    return result;
                }
            }
        }
        public async Task<User> Login(string auth)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                if (auth.StartsWith("{"))
                {
                    User user;
                    dynamic obj = JsonConvert.DeserializeObject(auth);
                    string email = obj.email;
                    string password = obj.password;
                    if (await isAuthExist(email, password))
                    {
                        user = await _context.Users.Include(u => u.Information)
                            .SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
                        user.Online = true;
                    }
                    else
                    {
                        user = new User();
                        user.Reason = User.AUTHORIZATION_FAILED;
                    }
                    return user;
                }
                else
                {
                    string JWT = auth;
                    User user = await _context.Users.Include(u => u.Information)
                        .SingleOrDefaultAsync(u => u.JWT == JWT);
                    user.Online = true;
                    return user;
                }
            }
        }
        private async Task<bool> IsEmailExist(string email)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                return await _context.Users.AnyAsync(u => u.Email == email);
            }
        }
        private async Task<bool> IsJWTExist(string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                return await _context.Users.AnyAsync(u => u.JWT == JWT);
            }
        }
        private async Task<bool> isAuthExist(string email, string password)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                return await _context.Users.AnyAsync(u => u.Email == email && u.Password == password);
            }
        }
    }
}
