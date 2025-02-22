using Microsoft.EntityFrameworkCore;
using Seek.Core.Application.Interface.Repositories;
using Seek.Core.Application.Interface.Services;
using Seek.Core.Application.Services;
using Seek.Infrastructure.Context;
using Seek.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.AddDbContext<HealthCareContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IProfileRepository, ProfileRepository>();
builder.Services.AddTransient<IRoleRepository, RoleRepository>();
builder.Services.AddTransient<IVerificationCodeRepository, VerificationCodeRepository>();
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IIdentityService, IdentityService>();
builder.Services.AddTransient<IBarcodeService, BarcodeService>();
builder.Services.AddTransient<IOCRService, OCRService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IRoleService, RoleService>();
builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<IUserInteractionService, UserInteractionService>();
builder.Services.AddScoped<IVerificationCodeService, VerificationCodeService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddHttpClient();
builder.Services.AddHttpClient<BarcodeService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
