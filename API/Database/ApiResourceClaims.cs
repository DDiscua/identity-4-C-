using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiResourceClaims
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Type { get; set; }
        public int ApiResourceId { get; set; }

        [ForeignKey(nameof(ApiResourceId))]
        [InverseProperty(nameof(ApiResources.ApiResourceClaims))]
        public virtual ApiResources ApiResource { get; set; }
    }
}
