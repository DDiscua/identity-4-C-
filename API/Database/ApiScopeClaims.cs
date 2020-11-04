using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiScopeClaims
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Type { get; set; }
        public int ScopeId { get; set; }

        [ForeignKey(nameof(ScopeId))]
        [InverseProperty(nameof(ApiScopes.ApiScopeClaims))]
        public virtual ApiScopes Scope { get; set; }
    }
}
