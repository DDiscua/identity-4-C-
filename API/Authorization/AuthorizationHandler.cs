using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace API.Authorization
{
    public class AuthorizationHandler
    {


        private readonly RequestDelegate next;

        public AuthorizationHandler(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            string authoriztionHeader = context.Request.Headers["Authorization"];

            if (!String.IsNullOrEmpty(authoriztionHeader))
            {
                await this.next.Invoke(context);
            }
            else
            {
                context.Response.StatusCode = 401;
            }
        }


    }

    public static class AuthorizationHandlerExtensions
    {
        public static IApplicationBuilder UseMyCustomAuthentication(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthorizationHandler>();
        }
    }
}
