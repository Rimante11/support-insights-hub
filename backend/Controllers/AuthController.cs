using Microsoft.AspNetCore.Mvc;
using SupportInsightsHub.Api.DTOs;
using SupportInsightsHub.Api.Services;

namespace SupportInsightsHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto loginRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authService.LoginAsync(loginRequest);

        if (!result.Success)
        {
            return Unauthorized(result);
        }

        return Ok(result);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // In a real application, you might want to invalidate the token
        // For now, just return success (client will remove token)
        return Ok(new { message = "Logged out successfully" });
    }
}
