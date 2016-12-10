using Blindating.Models.Interfaces;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using NetCoreAngular2.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                    .ThenInclude(i => i.Questions)
                    .ThenInclude(q => q.Answers)
                        .Where(u => u.JWT == JWT)
                        .SingleOrDefaultAsync();

                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Questions)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return GetAllAnsweredQuestions(authUser.Information.Questions[0].Answers, user.Information.Questions);
            }
        }
        public async Task<IEnumerable<Question>> GetNotAnsweredByID(string JWT, int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User authUser = await _context.Users.Include(u => u.Information)
                    .ThenInclude(i => i.Questions)
                    .ThenInclude(q => q.Answers)
                        .Where(u => u.JWT == JWT)
                        .SingleOrDefaultAsync();

                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Questions)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return GetNotAnsweredQuestions(authUser.Information.Questions[0].Answers, user.Information.Questions);
            }
        }

        public async Task<bool> SetAnswer(Answer answer)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                Answer remoteAnswer = new Answer(answer);
                var questionFK = (from q in _context.Questions
                                  where q.InformationQuestionFK == answer.InformationFK && q.Message == answer.Message
                                  select q.ID).SingleOrDefault();

                var remoteQuestionFK = (from q in _context.Questions
                                        where q.InformationQuestionFK == answer.User.Information.ID
                                        select q.ID).SingleOrDefault();

                remoteAnswer.Direction = "Leaved";
                remoteAnswer.QuestionAnswerFK = remoteQuestionFK;

                answer.QuestionAnswerFK = questionFK;

                _context.Answers.Add(answer);
                _context.Answers.Add(remoteAnswer);

                await _context.SaveChangesAsync();

                return true;
            }
        }

        private List<Question> GetAllAnsweredQuestions(List<Answer> answers, List<Question> questions)
        {
            List<Question> answeredQuestions = new List<Question>(questions);

            foreach (Question q in questions)
            {
                foreach (Answer a in answers)
                    if (q.Message == a.Message)
                        q.Answered = a.Result;
            }
            return answeredQuestions;
        }

        private List<Question> GetNotAnsweredQuestions(List<Answer> answers, List<Question> questions)
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
                foreach (Answer a in answers)
                    if (q.Message == a.Message)
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
