using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiResources
    {
        public ApiResources()
        {
            ApiResourceClaims = new HashSet<ApiResourceClaims>();
            ApiResourceProperties = new HashSet<ApiResourceProperties>();
            ApiResourceScopes = new HashSet<ApiResourceScopes>();
            ApiResourceSecrets = new HashSet<ApiResourceSecrets>();
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
        [StringLength(100)]
        public string AllowedAccessTokenSigningAlgorithms { get; set; }
        public bool ShowInDiscoveryDocument { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? LastAccessed { get; set; }
        public bool NonEditable { get; set; }

        [InverseProperty("ApiResource")]
        public virtual ICollection<ApiResourceClaims> ApiResourceClaims { get; set; }
        [InverseProperty("ApiResource")]
        public virtual ICollection<ApiResourceProperties> ApiResourceProperties { get; set; }
        [InverseProperty("ApiResource")]
        public virtual ICollection<ApiResourceScopes> ApiResourceScopes { get; set; }
        [InverseProperty("ApiResource")]
        public virtual ICollection<ApiResourceSecrets> ApiResourceSecrets { get; set; }
    }
}
