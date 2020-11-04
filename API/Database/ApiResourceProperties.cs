using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Database
{
    public partial class ApiResourceProperties
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string Key { get; set; }
        [Required]
        [StringLength(2000)]
        public string Value { get; set; }
        public int ApiResourceId { get; set; }

        [ForeignKey(nameof(ApiResourceId))]
        [InverseProperty(nameof(ApiResources.ApiResourceProperties))]
        public virtual ApiResources ApiResource { get; set; }
    }
}
