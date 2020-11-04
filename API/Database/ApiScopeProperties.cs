using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiScopeProperties
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string Key { get; set; }
        [Required]
        [StringLength(2000)]
        public string Value { get; set; }
        public int ScopeId { get; set; }

        [ForeignKey(nameof(ScopeId))]
        [InverseProperty(nameof(ApiScopes.ApiScopeProperties))]
        public virtual ApiScopes Scope { get; set; }
    }
}
