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
        public async Task<IEnumerable<Question>> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.Information).ThenInclude(i => i.Questions)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                return user.Information.Questions;
            }
        }

        public async Task<bool> SetAnswer(Answer answer)
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
}
