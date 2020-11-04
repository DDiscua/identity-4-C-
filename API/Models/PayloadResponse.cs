using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class PayloadResponse
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public object Payload { get; set; }
    }
}
