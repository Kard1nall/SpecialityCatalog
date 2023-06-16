using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SCData.Models;
using SpecialityCatalogWebApi.Data;
using SpecialityCatalogWebApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;


namespace SpecialityCatalogWebApi.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]

    public class AuthController : ControllerBase
    {
        private readonly StudentsDbContext _studentsDbContext;

        public AuthController(StudentsDbContext studentsDbContext)
        {
            _studentsDbContext = studentsDbContext;
        }


        [HttpPost]
        public IActionResult Login([FromBody] LoginModel data)
        {

            var user = _studentsDbContext.Users.FirstOrDefault(x => x.Name == data.Login && x.Password == data.Password);

            if (user == null)
            {
                return new JsonResult(new { status = 1, token = " " });
            }

            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, data.Login)
            };

            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2000)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JsonResult(new { status = 0, token });
        }

        [HttpPost("reg")]
        public async Task<IActionResult> PostAsync(User user)
        {
            if (user.Name == null)
                return BadRequest(new Response { ErrorMsg = "Имя пользователя яляется обязательным" });
            if (user.Password == null)
                return BadRequest(new Response { ErrorMsg = "Пароль яляется обязательным" });
            

            var existUser = new User();
            try
            {
                existUser = _studentsDbContext.Users.FirstOrDefault(u => u.Name == user.Name);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response { ErrorMsg = $"Ошибка проверки дубликата пользователя: {ex}" });
            }

            if (existUser != null)
                return BadRequest(new Response { ErrorMsg = "Пользователь с такой почтой уже зарегистрирован" });

            user.Name = user.Name.ToLower();


            try
            {
                await _studentsDbContext.Users.AddAsync(user);
                await _studentsDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new Response { ErrorMsg = "Ошибка регистрации пользователя" });
            }

            return Ok(new Response { Success = true, SuccessMsg = "Успешная регистрация" });
        }

    }
}
