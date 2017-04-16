using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using Blindating.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Blindating.Models.Repositories
{
    public class QuestionRepository : BaseRepository<Question>, IQuestionRepository
    {
        private AppDBContext _context;
        public QuestionRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Question>> GetAllByID(string JWT, int userID) {
            using (AppDBContext _context = new AppDBContext())
            {
                User authUser = await _context.Users.Include(u => u.Information)
                        .Where(u => u.JWT == JWT)
                        .SingleOrDefaultAsync();

                User user = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Questions)
                                                .ThenInclude(q => q.QuestionAnswers)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return GetAllAnsweredQuestions(authUser.ID, user.Information.Questions);
            }
        }
        public async Task<IEnumerable<Question>> GetNotAnsweredByID(string JWT, int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User authUser = await _context.Users.Include(u => u.Information)
                    .Where(u => u.JWT == JWT)
                    .SingleOrDefaultAsync();

                User user = await _context.Users.Include(u => u.Information)
                                                .ThenInclude(i => i.Questions)
                                                .ThenInclude(q => q.QuestionAnswers)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return GetNotAnsweredQuestions(authUser.ID, user.Information.Questions);
            }
        }

        public async Task<bool> SetAnswer(QuestionAnswer answer)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                QuestionAnswer remoteAnswer = new QuestionAnswer(answer);
                remoteAnswer.RemoteUser = await GetBy(new { field = "InformationID", value = answer.InformationQuestionFK.ToString() });
                _context.QuestionAnswers.Add(answer);
                _context.Notifications.Add(Notification.Create(answer.RemoteInfoQuestionFK, "answer", JsonConvert.SerializeObject(remoteAnswer)));
                await _context.SaveChangesAsync();

                return true;
            }
        }

        private List<Question> GetAllAnsweredQuestions(int ID, List<Question> questions)
        {
            List<Question> answeredQuestions = new List<Question>(questions);

            foreach (Question q in questions)
            {
                q.AnswersCount = q.QuestionAnswers.Count;
                foreach (QuestionAnswer a in q.QuestionAnswers)
                    if (a.RemoteUserID == ID)
                        q.Answered = a.Result;
            }
            return answeredQuestions;
        }

        private List<Question> GetNotAnsweredQuestions(int ID, List<Question> questions)
        {
            List<Question> notAnsweredQuestions = new List<Question>(questions);
            Question question = new Question();

            if (notAnsweredQuestions.Count == 0)
            {
                question.Message = "User does not add question to others yet";
                notAnsweredQuestions.Add(question);
            }

            foreach (Question q in questions)
            {
                q.AnswersCount = q.QuestionAnswers.Count;
                foreach (QuestionAnswer a in q.QuestionAnswers)
                    if (a.RemoteUserID == ID)
                        notAnsweredQuestions.Remove(q);

                if (notAnsweredQuestions.Count == 0)
                {
                    question.Message = "You answered on all questions";
                    notAnsweredQuestions.Add(question);
                }
            }
            return notAnsweredQuestions;
        }
    }
}
