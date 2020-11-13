using API.DBContext;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace API.BEController
{
    public class UserDataController
    {
        public List<AspNetUsers> GetUsers()
        {
            using (var context = new ApplicationDbContext())
            {
                try
                {
                    /*   var Users = context.AspNetUsers.Select(U => new AspNetUsers
                       {
                           Id = U.Id,
                           UserName = U.UserName,
                           Email = U.Email,
                           PhoneNumber = U.PhoneNumber
                       }).ToList();*/
                    return null;
                }
                catch (Exception E)
                {
                    Console.WriteLine("Exception retreving users : " + E.Message.ToString());
                    return null;
                }

            }
        }

        public async Task<IdentityResponse> Login(UserLoginRequest UserRequest)
        {
            try
            {
                const string _url = "https://identity_provider:5000/connect/token";
                var values = new Dictionary<string, string>
                {
                    {"grant_type", "password"},
                    {"scope", "api1.read"},
                    { "client_id","reactTest"},
                    {"client_secret","SuperSecretPassword" },
                    {"username",UserRequest.UserName},
                    {"password",UserRequest.Password}
                };
                using (var handler = new HttpClientHandler())
                {
                    
            
                    using (var httpClient = new HttpClient(handler))
                    {
                        handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true;
                     /*   System.Net.ServicePointManager.ServerCertificateValidationCallback +=
                        delegate (object sender, System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                                                System.Security.Cryptography.X509Certificates.X509Chain chain,
                                                System.Net.Security.SslPolicyErrors sslPolicyErrors)
                        {
                            return true;
                        };*/
                        using (var content = new FormUrlEncodedContent(values))
                        {
                            content.Headers.Clear();
                            content.Headers.Add("Content-Type", "application/x-www-form-urlencoded");

                            HttpResponseMessage response = await httpClient.PostAsync(_url, content);

                            var _token = await response.Content.ReadAsStringAsync();
                            var _parseToken = JsonConvert.DeserializeObject<IdentityResponse>(_token);
                            return _parseToken;
                        }
                    }
                }


            }
            catch (Exception E)
            {
                throw E;

            }

        }


    }
}
