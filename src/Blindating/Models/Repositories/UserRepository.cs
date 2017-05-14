using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Blindating.Models.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Blindating.Controllers.Utils.Social;

namespace Blindating.Models.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private AppDBContext _context;
        public UserRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<dynamic> Register(User user, string JWT)
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
                    user.JWT = JWT;
                    user.Image = "images/users/no-avatar.png";
                    user.Information = new Information();
                    user.Information.Preference = new Preference();
                    user.Information.Detail = new Detail();
                    user.Information.Rating = new Rating();

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
                if (auth.Contains("password"))
                    return await this.LoginViaPassword(auth);
                else if (auth.Contains("jwt"))
                    return await this.LoginViaJWT(auth);
                else if (auth.Contains("facebook"))
                    return await this.LoginViaFacebook(auth);
                else if (auth.Contains("vk"))
                    return await this.LoginViaVK(auth);
                else return null;
            }
        }

        private async Task<User> LoginViaJWT(string auth)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                dynamic obj = JsonConvert.DeserializeObject(auth);
                string JWT = obj.jwt;
                User user = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Rating)
                    .SingleOrDefaultAsync(u => u.JWT == JWT);
                user.GradeRating = user.Information.Rating.Grade;
                user.CountRating = user.Information.Rating.Count;
                user.Online = true;
                user.Reason = User.AUTHORIZATION_SUCCESS;
                await _context.SaveChangesAsync();
                return user;
            }
        }

        private async Task<User> LoginViaPassword(string auth)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user;
                dynamic obj = JsonConvert.DeserializeObject(auth);
                string email = obj.email;
                string password = obj.password;
                if (await isAuthExist(email, password))
                {
                    user = await _context.Users.Include(u => u.Information)
                                               .ThenInclude(i => i.Rating)
                        .SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
                    user.GradeRating = user.Information.Rating.Grade;
                    user.CountRating = user.Information.Rating.Count;
                    user.Online = true;
                    user.Reason = User.AUTHORIZATION_SUCCESS;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    user = new User();
                    user.Reason = User.AUTHORIZATION_FAILED;
                }
                return user;
            }
        }

        private async Task<User> LoginViaFacebook(string auth)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = null;
                string secret = "7d94069605af1505a9f71c57fed00868";
                HMACSHA256 sha256 = new HMACSHA256(Encoding.ASCII.GetBytes(secret));

                dynamic obj = JsonConvert.DeserializeObject(auth);
                string email = obj.email;
                string social = obj.facebook;

                string encodedSignature = social.Split('.')[0];
                string payload = social.Split('.')[1];
                string signature = Base64UrlEncoder.Decode(encodedSignature);
                string expectedSignature = Encoding.UTF8.GetString(sha256.ComputeHash(Encoding.ASCII.GetBytes(payload)));

                if (signature == expectedSignature)
                {
                    user = await _context.Users.Include(u => u.Information)
                                               .ThenInclude(i => i.Rating)
                        .SingleOrDefaultAsync(u => u.Email == email);
                    user.GradeRating = user.Information.Rating.Grade;
                    user.CountRating = user.Information.Rating.Count;
                    user.Online = true;
                    user.Reason = User.AUTHORIZATION_SUCCESS;
                    await _context.SaveChangesAsync();
                }

                return user;
            }
        }

        private async Task<User> LoginViaVK(string auth)
        {
            User user = null;
            dynamic obj = JsonConvert.DeserializeObject(auth);
            string email = obj.email;
            string social = obj.vk;

            user = await _context.Users.Include(u => u.Information)
                                       .ThenInclude(i => i.Rating)
                    .SingleOrDefaultAsync(u => u.Email == email);
            user.GradeRating = user.Information.Rating.Grade;
            user.CountRating = user.Information.Rating.Count;
            user.Online = true;
            user.Reason = User.AUTHORIZATION_SUCCESS;
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task Logout(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                user.Online = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> IsEmailExist(string email)
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
        public async Task<User> GetCalling(string callingJWT, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = null;
                User calling = null;
                user = await _context.Users.Include(u => u.Information)
                                           .ThenInclude(i => i.Conversations)
                                           .FirstOrDefaultAsync(u => u.JWT == JWT);
                calling = await _context.Users.Include(u => u.Information)
                                              .ThenInclude(i => i.Conversations)
                                              .Include(u => u.Information)
                                              .ThenInclude(i => i.Rating)
                                              .FirstOrDefaultAsync(u => u.JWT == callingJWT);
                List<User> users = new List<User>() { calling };
                return this.GetVideoInitiatedUsers(users, user)[0];
            }
        }
        public async Task<List<User>> GetNew(int count, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                var user = await GetBy(new { field = "JWT", value = JWT, });
                var users = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Conversations)
                                                .Include(u => u.Information)
                                                .ThenInclude(i => i.Rating).ToListAsync();

                users.Reverse();
                users = users.Take(count).ToList();
                return GetVideoInitiatedUsers(users, user);
            }
        }
        public async Task<List<User>> GetActive(int count, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                var user = await GetBy(new { field = "JWT", value = JWT, });
                var activeUsers = new List<User>();
                var tempActiveUsers = new List<dynamic>();

                var compositeActiveUsers = from information in _context.Informations
                                           join conversation in _context.Conversations on information.ID equals conversation.InformationConversationFK
                                           into conversations
                                           join feedback in _context.Feedbacks on information.ID equals feedback.InformationFeedbackFK
                                           into feedbacks
                                           join question in _context.Questions.Include(q => q.QuestionAnswers) on information.ID equals question.InformationQuestionFK
                                           into questions
                                           select new { InformationID = information.ID, Conversations = conversations, Feedbacks = feedbacks, Questions = questions };

                foreach (var cau in compositeActiveUsers)
                {
                    var u = await GetBy(new { field = "InformationID", value = cau.InformationID.ToString() });
                    var conversationsCount = cau.Conversations.Where(c => c.Direction == "initiatedCaller").Count();
                    var feedbacksCount = cau.Feedbacks.Where(c => c.Direction == "Leaved").Count();
                    var answersCount = (from q in _context.Questions.Include(q => q.QuestionAnswers)
                                        from a in q.QuestionAnswers
                                        where a.RemoteUserID == u.ID
                                        select a).ToList().Count;
                    tempActiveUsers.Add(new
                    {
                        User = u,
                        ConversationsCount = conversationsCount,
                        FeedbacksCount = feedbacksCount,
                        AnswersCount = answersCount,
                        Sum = conversationsCount + feedbacksCount + answersCount
                    });
                }

                var tempOrderedActiveIsers = tempActiveUsers.OrderByDescending(d => d.Sum).Take(count);

                foreach (var u in tempOrderedActiveIsers)
                {
                    u.User.ConversationsCount = u.ConversationsCount;
                    u.User.FeedbacksCount = u.FeedbacksCount;
                    u.User.AnswersCount = u.AnswersCount;
                    u.User.GradeRating = u.User.Information.Rating.Grade;
                    u.User.CountRating = u.User.Information.Rating.Count;
                    activeUsers.Add(u.User);
                }

                return GetVideoInitiatedUsers(activeUsers, user);
            }
        }
        public async Task<List<User>> GetPopular(int count, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                var user = await GetBy(new { field = "JWT", value = JWT, });
                var popularUsers = new List<User>();
                var tempPopularUsers = new List<dynamic>();

                var compositePopularUsers = from information in _context.Informations
                                            join conversation in _context.Conversations on information.ID equals conversation.InformationConversationFK
                                            into conversations
                                            join feedback in _context.Feedbacks on information.ID equals feedback.InformationFeedbackFK
                                            into feedbacks
                                            join question in _context.Questions.Include(q => q.QuestionAnswers) on information.ID equals question.InformationQuestionFK
                                            into questions
                                            select new { InformationID = information.ID, Conversations = conversations, Feedbacks = feedbacks, Questions = questions };

                foreach (var cpu in compositePopularUsers)
                {
                    var u = await GetBy(new { field = "InformationID", value = cpu.InformationID.ToString() });
                    var conversationsCount = cpu.Conversations.Where(c => c.Direction == "initiatedCalling").Count();
                    var feedbacksCount = cpu.Feedbacks.Where(c => c.Direction == null).Count();
                    var answersCount = (from q in cpu.Questions
                                        from a in q.QuestionAnswers
                                        where a.Direction == "Leaved"
                                        select a).ToList().Count;

                    tempPopularUsers.Add(new
                    {
                        User = u,
                        ConversationsCount = conversationsCount,
                        FeedbacksCount = feedbacksCount,
                        AnswersCount = answersCount,
                        Sum = conversationsCount + feedbacksCount + answersCount,
                    });
                }

                var tempOrderedPopularUsers = tempPopularUsers.OrderByDescending(d => d.Sum).Take(count);

                foreach (var u in tempOrderedPopularUsers)
                {
                    u.User.ConversationsCount = u.ConversationsCount;
                    u.User.FeedbacksCount = u.FeedbacksCount;
                    u.User.AnswersCount = u.AnswersCount;
                    u.User.GradeRating = u.User.Information.Rating.Grade;
                    u.User.CountRating = u.User.Information.Rating.Count;
                    popularUsers.Add(u.User);
                }

                return GetVideoInitiatedUsers(popularUsers, user);
            }
        }
        public async Task<List<User>> GetRandom(int count, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                Random random = new Random();
                var user = await GetBy(new { field = "JWT", value = JWT });
                var users = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Conversations)
                                                .Include(u => u.Information)
                                                .ThenInclude(i => i.Rating)
                                                .OrderBy(u => random.Next())
                                                .Take(count)
                                                .ToListAsync();
                return GetVideoInitiatedUsers(users, user);
            }
        }
        private List<User> GetVideoInitiatedUsers(List<User> users, User user)
        {
            foreach (var u in users)
            {
                u.GradeRating = u.Information.Rating.Grade;
                u.CountRating = u.Information.Rating.Count;
                if (u.ID == user.ID) u.IsVideoShared = true;
                foreach (var c in u.Information.Conversations)
                    if (c.RemoteUserID == user.ID && c.IsVideoInitiated)
                        u.IsVideoShared = true;
            }
            return users;
        }
        public string GetVKInfo(string code)
        {
            string appid = "5549517";
            string secret = "8PhSwnODtPG5jLUparY4";
            VKToken token = VkHelpers.GetToken(appid, secret, code);
            string email = token.Email;
            return email;
        }
    }
}
