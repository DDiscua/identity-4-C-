using IntegrationTest.Models;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using Xunit.Priority;

namespace IntegrationTest
{
    [TestCaseOrderer(PriorityOrderer.Name, PriorityOrderer.Assembly)]
    public class UnitTest1
    {

        private UserModel LastUserCreated;

        [Fact, Priority(1)]
        public async Task RegisterUser()
        {
            APIWrapper ApiCaller = new APIWrapper("RegisterUser", "");
            UserModel NewUser = GenerateRandomUser();
            this.LastUserCreated = NewUser;
            var Response = await ApiCaller.invoke(NewUser);

            //asssert
            Assert.True(Response != null && Response.Code == 200, "User Created failed");

            //  Assert.False(Response == null && Response.Code != 200, "User Create failted");

        }

        [Fact, Priority(2)]
        public async Task UpdateUser()
        {
            APIWrapper ApiCaller = new APIWrapper("UpdateUserById", "");

            var Response = await ApiCaller.invokePut(new UserModelUpdate
            {
                UserName = LastUserCreated != null ? LastUserCreated.UserName : "user_test@" + 0 + ".com",
                Claims = GenerateRandomClaims()
            }, "");

            //asssert
            Assert.True(Response != null && Response.Code == 200, "User Update failed");

            // Assert.False(Response == null && Response.Code != 200, "User Update failed");
        }


        [Fact, Priority(3)]
        public async Task DeleteUserById()
        {
            APIWrapper ApiCaller = new APIWrapper("DeleteUserById", "");
            var Response = await ApiCaller.invokePut(new UserModelUpdate
            {
                UserName = LastUserCreated != null ? LastUserCreated.UserName : "user_test@" + 0 + ".com",
                Claims = null
            }, "");

            //asssert

            Assert.True(Response != null && Response.Code == 200, "User Delete failed");

            //  Assert.False(Response == null && Response.Code != 200, "User Delete failted");


        }


        [Fact, Priority(4)]
        public async Task ListUsers()
        {
            APIWrapper ApiCaller = new APIWrapper("ListUsers", "");
            var Response = await ApiCaller.invokeGet("");

            //asssert
            Assert.True(Response != null && Response.Code == 200, "List users failed");

            //Assert.False(Response == null && Response.Code != 200, "List users Success");


        }


        private List<CustomClaim> GenerateRandomClaims()
        {
            List<CustomClaim> NewClaims = new List<CustomClaim>();
            NewClaims.Add(new CustomClaim { Type = GenerateRandomString(), Value = GenerateRandomString() });
            NewClaims.Add(new CustomClaim { Type = GenerateRandomString(), Value = GenerateRandomString() });
            NewClaims.Add(new CustomClaim { Type = GenerateRandomString(), Value = GenerateRandomString() });
            NewClaims.Add(new CustomClaim { Type = GenerateRandomString(), Value = GenerateRandomString() });

            return NewClaims;
        }


        private string GenerateRandomString()
        {
            var _dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var _stringChars = new char[8];
            var _random = new Random();

            for (int i = 0; i < _stringChars.Length; i++)
            {
                _stringChars[i] = _dictionary[_random.Next(_dictionary.Length)];
            }
            return new String(_stringChars); ;
        }


        private UserModel GenerateRandomUser()
        {
            Random _rd = new Random();
            int _randNum = _rd.Next(0, 1000);
            string _password = GenerateRandomString() + "P_" + _randNum;
            return new UserModel
            {
                UserName = "user_test@" + 0 + ".com",
                Email = "user_test@" + _randNum + ".com",
                PhoneNumber = "9999999" + _randNum,
                Password = _password,
                ConfirmPassword = _password

            };

        }


    }
}
