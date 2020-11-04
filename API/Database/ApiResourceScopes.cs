using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiResourceScopes
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Scope { get; set; }
        public int ApiResourceId { get; set; }

        [ForeignKey(nameof(ApiResourceId))]
        [InverseProperty(nameof(ApiResources.ApiResourceScopes))]
        public virtual ApiResources ApiResource { get; set; }
    }
}
