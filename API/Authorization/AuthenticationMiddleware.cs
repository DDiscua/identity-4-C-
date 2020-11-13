using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Authorization
{
    public class AuthenticationMiddleware
    {

        public void Configure(IApplicationBuilder app)
        {
            app.UseMyCustomAuthentication();
        }


    }

}
