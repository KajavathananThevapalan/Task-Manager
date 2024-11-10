using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegisterController : ControllerBase
    {
        private readonly TaskContext _context;
        private readonly IConfiguration _configuration;

        public UserRegisterController(TaskContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> RegisterUser(UserRegister userRegister)
        {
            try
            {
                var user = new UserRegister
                {
                    Name = userRegister.Name,
                    Email = userRegister.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(userRegister.PasswordHash),
                    Role = (UserRole)userRegister.Role,
                };

                var data = _context.UsersRegister.AddAsync(user);
                await _context.SaveChangesAsync();

                var token = CreateToken(user);
                return Ok(token);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("Log-In")]
        public async Task<IActionResult> LogIn(Login login)
        {
            try
            {
                var user = _context.UsersRegister.SingleOrDefault(u => u.Email == login.Email) ?? throw new Exception("User Not Found");
                var hash = BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash);
                if (hash)
                {
                    var token = CreateToken(user);
                    return Ok(token);
                }
                else
                {
                    throw new Exception("Invalid Password");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<string> Test()
        {
            var data = User.FindFirst("Role").Value;
            return data;
        }

        private TokenModel CreateToken(UserRegister user) 
        { 
            var claimList = new List<Claim>();
            claimList.Add(new Claim("UserId",user.Id.ToString()));
            claimList.Add(new Claim("Name", user.Name));
            claimList.Add(new Claim("Email", user.Email));
            claimList.Add(new Claim("Role", user.Role.ToString()));
            claimList.Add(new Claim(ClaimTypes.Role,user.Role.ToString()));

            var key = _configuration["JWT:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credentials = new SigningCredentials(secKey,SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claimList,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
                );
            var res = new TokenModel();
            res.Token = new JwtSecurityTokenHandler().WriteToken(token);
            return res;
        }

    }
}
