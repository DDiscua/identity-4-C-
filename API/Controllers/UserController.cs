using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.BEController;
using API.DBContext;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace API.Controllers
{


    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserDataController _customUserManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserController> _logger;
        private readonly int SUCCESS_CODE = 200;
        private readonly int ERROR_CODE = 500;

        public UserController
           (
            ApplicationDbContext context,
            ILogger<UserController> logger,
            UserManager<ApplicationUser> userManager
           )

        {
            try
            {
                _customUserManager = new UserDataController();
                _userManager = userManager;
                _logger = logger;
            }
            catch (Exception E)
            {
                _logger.LogError("Init User controllers failed : " + E.Message);
            }
        }


        [Route("ListUsers")]
        [HttpGet]
        public async Task<PayloadResponse> ListUsers()
        {
            PayloadResponse Response = new PayloadResponse();
            var Users = await _userManager.Users.ToListAsync();
            List<User> UserClaims = new List<User>();
            foreach (var v in Users)
            {
                User U = new User();
                var roles = await _userManager.GetRolesAsync(v);
                var claims = await _userManager.GetClaimsAsync(v);
                U.Id = v.Id;
                U.Email = v.UserName;
                U.PhoneNumber = v.PhoneNumber;
                U.UserName = v.UserName;
                U.Claims = claims.ToList();
                U.Roles = roles.ToList();
                UserClaims.Add(U);
            }

            if (Users != null)
            {
                Response.Code = SUCCESS_CODE;
                Response.Message = "Success";
                Response.Payload = UserClaims;
            }
            else
            {
                Response.Code = ERROR_CODE;
                Response.Message = "Failed";
                Response.Payload = null;
            }
            return Response;
        }

        [Route("GetUserById")]
        [HttpGet("{id}")]
        public async Task<PayloadResponse> GetUserById(string id)
        {
            PayloadResponse Response = new PayloadResponse();
            var User = await _userManager.FindByIdAsync(id);

            if (User != null)
            {
                User UserClaims = new User();
                var roles = await _userManager.GetRolesAsync(User);
                var claims = await _userManager.GetClaimsAsync(User);

                UserClaims.Id = User.Id;
                UserClaims.Email = User.UserName;
                UserClaims.PhoneNumber = User.PhoneNumber;
                UserClaims.UserName = User.UserName;
                UserClaims.Claims = claims.ToList();
                UserClaims.Roles = roles.ToList();

                Response.Code = SUCCESS_CODE;
                Response.Message = "Success";
                Response.Payload = UserClaims;
            }
            else
            {
                Response.Code = ERROR_CODE;
                Response.Message = "User not found";
                Response.Payload = null;
            }
            return Response;
        }

        [HttpPut("{id}")]
        [Route("UpdateUserById")]
        public async Task<PayloadResponse> UpdateUser([FromBody] UserModelUpdate User, string id)
        {
            PayloadResponse Response = new PayloadResponse();
            var UserToUpdate = await _userManager.FindByNameAsync(User.UserName);
            if (UserToUpdate != null)
            {

                var claims = await _userManager.GetClaimsAsync(UserToUpdate);
                await _userManager.RemoveClaimsAsync(UserToUpdate, claims);
                //Add Claims
                if (User.Claims != null)
                {
                    foreach (CustomClaim claim in User.Claims)
                    {

                        await _userManager.AddClaimAsync(UserToUpdate, new Claim(claim.Type, claim.Value));
                    }

                }

                var Result = await _userManager.UpdateAsync(UserToUpdate);
                if (Result.Succeeded)
                {
                    Response.Code = SUCCESS_CODE;
                    Response.Message = "User claims updated succesfully";
                    Response.Payload = null;
                }
            }
            else
            {
                Response.Code = ERROR_CODE;
                Response.Message = "User not found";
                Response.Payload = null;
            }


            return Response;
        }

        [HttpPut]
        [Route("DeleteUserById")]
        public async Task<PayloadResponse> DeleteUserById(string id)
        {
            PayloadResponse Response = new PayloadResponse();
            var UserToUpdate = await _userManager.FindByIdAsync(id);
            if (UserToUpdate != null)
            {
                var Result = await _userManager.DeleteAsync(UserToUpdate);
                if (!Result.Succeeded)
                {
                    Response.Code = ERROR_CODE;
                    Response.Message = "Unexpected error trying to delete the user";
                    Response.Payload = null;
                }
            }
            else
            {
                Response.Code = ERROR_CODE;
                Response.Message = "User not found";
                Response.Payload = null;
            }


            return Response;
        }

        /*   [HttpPost]
     public IEnumerable<WeatherForecast> CreateUser(int Id)
     {
         var rng = new Random();
         return Enumerable.Range(1, 5).Select(index => new WeatherForecast
         {
             Date = DateTime.Now.AddDays(index),
             TemperatureC = rng.Next(-20, 55),
             Summary = Summaries[rng.Next(Summaries.Length)]
         })
         .ToArray();
     }
   */

        [HttpPost]
        [Route("Login")]
        public async Task<PayloadResponse> Login([FromBody] UserLoginRequest UserRequest)
        {
            PayloadResponse Response = new PayloadResponse();
            if (!ModelState.IsValid)
            {
                var _message = string.Join(",", ModelState.Values
                                             .SelectMany(v => v.Errors)
                                             .Select(e => e.ErrorMessage));
                Response.Code = ERROR_CODE;
                Response.Message = _message;
                return Response;
            }
            else
            {
                var IdentityCall = await _customUserManager.Login(UserRequest);

                if (IdentityCall.access_token != null)
                {
                    var User = await _userManager.FindByNameAsync(UserRequest.UserName);
                    if (User != null)
                    {
                        User UserClaims = new User();
                        var roles = await _userManager.GetRolesAsync(User);
                        var claims = await _userManager.GetClaimsAsync(User);

                        UserClaims.Id = User.Id;
                        UserClaims.Email = User.UserName;
                        UserClaims.PhoneNumber = User.PhoneNumber;
                        UserClaims.UserName = User.UserName;
                        UserClaims.Claims = claims.ToList();
                        UserClaims.Roles = roles.ToList();
                        UserClaims.Token = IdentityCall;
                        Response.Code = SUCCESS_CODE;
                        Response.Message = "Success";
                        Response.Payload = UserClaims;
                    }
                    else
                    {
                        Response.Code = ERROR_CODE;
                        Response.Message = "User not found";
                    }

                }
                else
                {
                    Response.Code = ERROR_CODE;
                    Response.Message = "Invalid password or username";
                }

                return Response;

            }


            return Response;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<PayloadResponse> RegisterUser([FromBody] UserModel User)
        {
            PayloadResponse Response = new PayloadResponse();
            if (!ModelState.IsValid)
            {
                var _message = string.Join(",", ModelState.Values
                                             .SelectMany(v => v.Errors)
                                             .Select(e => e.ErrorMessage));
                Response.Code = ERROR_CODE;
                Response.Message = _message;

                return Response;
            }
            else
            {
                var NewUser = new ApplicationUser
                {
                    UserName = User.UserName,
                    Email = User.Email,
                    PhoneNumber = User.PhoneNumber
                };

                var Result = await _userManager.CreateAsync(NewUser, User.Password);

                if (!Result.Succeeded)
                {
                    string errorDescription = "";
                    foreach (var err in Result.Errors)
                    {
                        errorDescription += err.Description + ",";
                    }
                    Response.Code = ERROR_CODE;
                    Response.Message = errorDescription.Remove(errorDescription.Length - 1, 1);
                }
                else
                {
                    var ExistingUser = await _userManager.FindByNameAsync(NewUser.UserName);
                    await _userManager.AddClaimAsync(ExistingUser, new Claim("ikatier", "photon"));

                    Response.Code = SUCCESS_CODE;
                    Response.Message = "User created succesfully";
                    Response.Payload = User;
                }

            }

            return Response;
        }

        /*   [HttpPost]
           public IEnumerable<WeatherForecast> Logout(int Id)
           {
               var rng = new Random();
               return Enumerable.Range(1, 5).Select(index => new WeatherForecast
               {
                   Date = DateTime.Now.AddDays(index),
                   TemperatureC = rng.Next(-20, 55),
                   Summary = Summaries[rng.Next(Summaries.Length)]
               })
               .ToArray();
           }*/
    }
}
