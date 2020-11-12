using System;
using System.Collections.Generic;
using System.Text;

namespace IntegrationTest
{
    public class PayloadResponse
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public object Payload { get; set; }
    }
}
