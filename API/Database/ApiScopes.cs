using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiScopes
    {
        public ApiScopes()
        {
            ApiScopeClaims = new HashSet<ApiScopeClaims>();
            ApiScopeProperties = new HashSet<ApiScopeProperties>();
        }

        [Key]
        public int Id { get; set; }
        public bool Enabled { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [StringLength(200)]
        public string DisplayName { get; set; }
        [StringLength(1000)]
        public string Description { get; set; }
        public bool Required { get; set; }
        public bool Emphasize { get; set; }
        public bool ShowInDiscoveryDocument { get; set; }

        [InverseProperty("Scope")]
        public virtual ICollection<ApiScopeClaims> ApiScopeClaims { get; set; }
        [InverseProperty("Scope")]
        public virtual ICollection<ApiScopeProperties> ApiScopeProperties { get; set; }
    }
}
