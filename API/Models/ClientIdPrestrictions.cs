﻿using System;
using System.Collections.Generic;

namespace API.Models
{
    public partial class ClientIdPrestrictions
    {
        public int Id { get; set; }
        public string Provider { get; set; }
        public int ClientId { get; set; }

        public virtual Clients Client { get; set; }
    }
}
