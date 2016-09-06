﻿using ASPAngular2Test.Controllers.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPAngular2Test.Models
{
    public interface IUserRepository
    {
        User Login(User user);
        string Register(User user);
        bool IsExistJWT(string jwt);
        bool IsExistEmail(string email);
        User GetUser(UserUtils.FindUser find);
        List<User> GetUsers(string jwt);
    }

    public interface IOnelineUserRepository
    {
        bool DeleteOnlineUser(int userID);
        List<User> GetOnlineUsers();
    }

    public interface IUtilsRepository
    {
        string GetVKInfo(string code);
        UserUtils.Quote GetRandomQuote(int userID);
        void AddNewQuote(UserUtils.Quote quote);
        List<UserUtils.Photo> GetPhotos(int userID);
        List<UserUtils.Conversation> GetConversations(int userID);
        bool AddConversation(UserUtils.Conversation conversation);
        List<string> GetCities(string country);
        List<UserUtils.Question> GetQuestions(int userID);
        UserUtils.Preference GetPreferences(int userID); 
        bool SetPreference(UserUtils.PreferenceUser preference);
        bool SetAnswer(UserUtils.Answer answer);
        List<string> GetNotifications(int userID);
        dynamic GetAnswerNotification(int answerID);
        bool UpdateNotifications(List<UserUtils.Notification> updateNotifications);
    }
}