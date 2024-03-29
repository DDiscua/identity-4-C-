﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class IdentityResources
    {
        public IdentityResources()
        {
            IdentityResourceClaims = new HashSet<IdentityResourceClaims>();
            IdentityResourceProperties = new HashSet<IdentityResourceProperties>();
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
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public bool NonEditable { get; set; }

        [InverseProperty("IdentityResource")]
        public virtual ICollection<IdentityResourceClaims> IdentityResourceClaims { get; set; }
        [InverseProperty("IdentityResource")]
        public virtual ICollection<IdentityResourceProperties> IdentityResourceProperties { get; set; }
    }
}
