using Blindating.Models;
using Blindating.Models.Interfaces;
using Blindating.Models.Repositories;
using Blindating.Models.Tables;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blindating.Models.Repositories
{
    public class MatchQuestionRepository : BaseRepository<MatchQuestion>, IMatchQuestionRepository
    {
        private AppDBContext _context;
        public MatchQuestionRepository(AppDBContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<MatchQuestion>> GetAllOverriden()
        {
            using (AppDBContext _context = new AppDBContext())
            {
                return await _context.MatchQuestions.Include(mq => mq.MatchAnswers)
                    .ToListAsync();
            }
        }
        public async void AddOverriden(MatchQuestion matchQuestion, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.UserMatchQuestions)
                                                .ThenInclude(umq => umq.MatchQuestion)
                                                .ThenInclude(mq => mq.MatchAnswers)
                    .Where(u => u.JWT == JWT)
                    .SingleOrDefaultAsync();

                UserMatchQuestion umquestion = new UserMatchQuestion { User = user, MatchQuestion = matchQuestion, MatchAnswerID = matchQuestion.MatchAnswerID };
                _context.MatchQuestions.Update(matchQuestion);
                _context.UserMatchQuestions.Add(umquestion);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<MatchQuestion>> GetAllByID(int userID)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.UserMatchQuestions)
                                                .ThenInclude(umq => umq.MatchQuestion)
                                                .ThenInclude(mq => mq.MatchAnswers)
                    .Where(u => u.ID == userID)
                    .SingleOrDefaultAsync();

                List<MatchQuestion> matchQuestions = await _context.MatchQuestions.Include(mq => mq.MatchAnswers).ToListAsync();
                foreach (UserMatchQuestion umquestion in user.UserMatchQuestions)
                {
                    var index = matchQuestions.FindIndex(mq => mq == umquestion.MatchQuestion);
                    matchQuestions[index] = new MatchQuestion(umquestion.MatchQuestion, umquestion.MatchAnswerID);
                }
                return matchQuestions;
            }
        }
        public async Task<List<MatchQuestion>> GetMatchedWith(int remoteUserID, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.UserMatchQuestions)
                                                .ThenInclude(umq => umq.MatchQuestion)
                                                .ThenInclude(mq => mq.MatchAnswers)
                    .Where(u => u.JWT == JWT)
                    .SingleOrDefaultAsync();

                User remoteUser = await _context.Users.Include(u => u.UserMatchQuestions)
                                                .ThenInclude(umq => umq.MatchQuestion)
                                                .ThenInclude(mq => mq.MatchAnswers)
                    .Where(u => u.ID == remoteUserID)
                    .SingleOrDefaultAsync();

                List<MatchQuestion> matchedQuestions = new List<MatchQuestion>();
                var matchedWithGroup = _context.UserMatchQuestions.Include(umq => umq.MatchQuestion)
                                                                  .ThenInclude(mq => mq.MatchAnswers)
                                                                  .Where(umq => umq.UserID == user.ID ||
                                                                                umq.UserID == remoteUserID)
                                                                  .GroupBy(umq => umq.MatchQuestionID)
                                                                  .Select(grp => grp.ToList());

                foreach (List<UserMatchQuestion> umqGroup in matchedWithGroup)
                {
                    if (umqGroup.Exists(umq => umq.UserID == user.ID) && umqGroup.Exists(umq => umq.UserID == remoteUserID)) {
                        var userMatchAnswerID       = umqGroup.First(umq => umq.UserID == user.ID).MatchAnswerID;
                        var remoteUserMatchAnswerID = umqGroup.First(umq => umq.UserID == remoteUserID).MatchAnswerID;

                        umqGroup[0].MatchQuestion.MatchAnswerID = userMatchAnswerID;
                        umqGroup[0].MatchQuestion.RemoteMatchAnswerID = remoteUserMatchAnswerID;
                        umqGroup[0].MatchQuestion.IsAnswered = true;

                        matchedQuestions.Add(umqGroup[0].MatchQuestion);
                    }
                }
                return matchedQuestions;
            }
        }
        public async void Answer(MatchQuestion matchQuestion, string JWT)
        {
            using (AppDBContext _context = new AppDBContext())
            {
                User user = await _context.Users.Include(u => u.UserMatchQuestions)
                                                .ThenInclude(umq => umq.MatchQuestion)
                                                .ThenInclude(mq => mq.MatchAnswers)
                    .Where(u => u.JWT == JWT)
                    .SingleOrDefaultAsync();

                var umquestion = new UserMatchQuestion { User = user, MatchQuestion = matchQuestion };
                _context.UserMatchQuestions.Add(umquestion);
            }
        }
    }
}
