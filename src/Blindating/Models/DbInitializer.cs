using Blindating.Models;
using Blindating.Models.Tables;
using NetCoreAngular2.Models.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Blindating.Models
{
    public class DbInitializer
    {
        public static void Initialize(AppDBContext _context)
        {
            _context.Database.EnsureCreated();

            if (_context.Users.Any()) return;

            //var users = new User[]
            //{
            //    new User
            //    {
            //        Firstname = "Andrew",
            //        Lastname = "Ryzhkov",
            //        Email = "orangeeez27.05.93@gmail.com",
            //        Password = "f00tBall"
            //    }
            //};

            //foreach (var user in users)
            //    _context.Users.Add(user);


            var mq1 = new MatchQuestion();
            mq1.Category = "Religion";
            mq1.Text = "Could you live without the Air?";
            mq1.IsAnswered = false;
            mq1.MatchAnswers = new List<MatchAnswer>() {
                    new MatchAnswer() { Text = "No, I have to focus on my work/class" },
                    new MatchAnswer() { Text = "Sometimes, but only during breaks" },
                    new MatchAnswer() { Text = "Only when I’m sure nobody can see it" }
                };
            //_context.MatchQuestions.Add(mq);

            //var user = _context.Users.First();

            //var umq = new UserMatchQuestion { User = user, MatchQuestion = mq };
            //_context.UserMatchQuestions.Add(umq);

            var matchQuestion = _context.MatchQuestions.
                    Include(mq => mq.MatchAnswers).First();
            var ma = new MatchAnswer();
            ma.Text = "No, I have to focus on my work/class";
            var ma1 = new MatchAnswer();
            ma1.Text = "Sometimes, but only during breaks";
            var ma2 = new MatchAnswer();
            ma2.Text = "Only when I’m sure nobody can see it";
            matchQuestion.MatchAnswers.Add(ma);
            matchQuestion.MatchAnswers.Add(ma1);
            matchQuestion.MatchAnswers.Add(ma2);

            _context.MatchQuestions.Add(mq1);

            _context.SaveChanges();
        }
    }
}
