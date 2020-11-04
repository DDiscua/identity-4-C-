using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiResourceSecrets
    {
        [Key]
        public int Id { get; set; }
        [StringLength(1000)]
        public string Description { get; set; }
        [Required]
        [StringLength(4000)]
        public string Value { get; set; }
        public DateTime? Expiration { get; set; }
        [Required]
        [StringLength(250)]
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public int ApiResourceId { get; set; }

        [ForeignKey(nameof(ApiResourceId))]
        [InverseProperty(nameof(ApiResources.ApiResourceSecrets))]
        public virtual ApiResources ApiResource { get; set; }
    }
}
