﻿using System;
using System.Collections.Generic;

namespace API.Models
{
    public partial class ClientGrantTypes
    {
        public int Id { get; set; }
        public string GrantType { get; set; }
        public int ClientId { get; set; }

        public virtual Clients Client { get; set; }
    }
}
