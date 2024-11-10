﻿using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTOs
{
    public class UserRegister
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public UserRole Role { get; set; }
    }
}