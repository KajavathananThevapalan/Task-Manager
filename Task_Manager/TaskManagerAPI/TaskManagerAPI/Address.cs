﻿using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }

        public User? User { get; set; }
        public int? UserId { get; set; }


    }
}
