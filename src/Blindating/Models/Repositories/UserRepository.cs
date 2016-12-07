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
                    await _context.SaveChangesAsync();
                    return user;
                }
                else
                {
                    string JWT = auth;
                    User user = await _context.Users.Include(u => u.Information)
                        .SingleOrDefaultAsync(u => u.JWT == JWT);
                    user.Online = true;
                    await _context.SaveChangesAsync();
                    return user;
                }
            }
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
        public async Task<List<User>> GetNew(int count, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                var user = await GetBy(new { field = "JWT", value = JWT, });
                var users = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Conversations).ToListAsync();
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
                                           join question in _context.Questions.Include(q => q.Answers) on information.ID equals question.InformationQuestionFK
                                           into questions
                                           select new { InformationID = information.ID, Conversations = conversations, Feedbacks = feedbacks, Questions = questions };

                foreach (var cau in compositeActiveUsers)
                {
                    var u = await GetBy(new { field = "InformationID", value = cau.InformationID.ToString() });
                    var conversationsCount = cau.Conversations.Where(c => c.Direction == "initiatedCaller").Count();
                    var feedbacksCount = cau.Feedbacks.Where(c => c.Direction == "Leaved").Count();
                    var answersCount = (from q in cau.Questions
                                        from a in q.Answers
                                        where a.Direction == "Leaved"
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

                var tempOrdereActiveIsers = tempActiveUsers.OrderByDescending(d => d.Sum).Take(count);

                foreach (var u in tempOrdereActiveIsers)
                {
                    u.User.ConversationsCount = u.ConversationsCount;
                    u.User.FeedbacksCount = u.FeedbacksCount;
                    u.User.AnswersCount = u.AnswersCount;
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
                                            join question in _context.Questions.Include(q => q.Answers) on information.ID equals question.InformationQuestionFK
                                            into questions
                                            select new { InformationID = information.ID, Conversations = conversations, Feedbacks = feedbacks, Questions = questions };

                foreach (var cpu in compositePopularUsers)
                {
                    var u = await GetBy(new { field = "InformationID", value = cpu.InformationID.ToString() });
                    var conversationsCount = cpu.Conversations.Where(c => c.Direction == "initiatedCalling").Count();
                    var feedbacksCount = cpu.Feedbacks.Where(c => c.Direction == null).Count();
                    var answersCount = (from q in cpu.Questions
                                        from a in q.Answers
                                        where a.Direction == null
                                        select a).ToList().Count;

                    tempPopularUsers.Add(new {
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
                    popularUsers.Add(u.User);
                }

                return GetVideoInitiatedUsers(popularUsers, user);
            }
        }
        private List<User> GetVideoInitiatedUsers(List<User> users, User user)
        {
            foreach (var u in users)
               foreach (var c in u.Information.Conversations)
                    if (c.RemoteUserID == user.ID && c.IsVideoInitiated || u.ID == user.ID)
                        u.IsVideoShared = true;
            return users;
        }
    }
}
