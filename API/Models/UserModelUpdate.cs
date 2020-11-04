using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class UserModelUpdate
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; }
        public List<CustomClaim> Claims { get; set; }
    }
}
