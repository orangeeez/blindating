using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace NetCoreAngular2.Controllers.Utils
{
    public static class TokenAuth
    {
        public static string CreateToken(TokenAuthOptions options, string email)
        {
            var JWT = new JwtSecurityToken(
             issuer:             options.Issuer,
             audience:           options.Audience,
             signingCredentials: options.SigningKey,
             claims:             new[] { new Claim("email", email)  }
            );

            return new JwtSecurityTokenHandler().WriteToken(JWT);
        }
    }
}
