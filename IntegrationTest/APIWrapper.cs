using Newtonsoft.Json;
using System;

using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace IntegrationTest
{


    public class APIWrapper
    {
        private string _baseUrl = "https://localhost:5001/User/";
        private string _uri;
        private string _method;
        private string _token;
        private string _contentType;
        private HttpClientHandler _config;
        private readonly HttpClient httpClient;

        public APIWrapper(string method, string token)
        {
            _uri = _baseUrl;
            _method = method;
            _token = token;
            _contentType = "application/json";
            _config = new HttpClientHandler()
            {
                MaxConnectionsPerServer = 1000,
                ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
        };

        }


        public async Task<PayloadResponse> invoke(object requestObject)
        {
            using (var client = new HttpClient(_config))
            {
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_contentType));
                client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", _token));
                client.BaseAddress = new Uri(_uri);
                var myContent = JsonConvert.SerializeObject(requestObject);
                var byteContent = new StringContent(myContent, Encoding.UTF8, "application/json");
                var result = await client.PostAsync(_method, byteContent);
                string resultContent = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<PayloadResponse>(resultContent);
                return response;
            }

        }


        public async Task<PayloadResponse> invokeGet(string _params)
        {
            using (var client = new HttpClient(_config))
            {
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_contentType));
                client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", _token));
                client.BaseAddress = new Uri(_uri);
                var result = await client.GetAsync(_method);
                string resultContent = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<PayloadResponse>(resultContent);
                return response;
            }

        }

        public async Task<PayloadResponse> invokePut(object requestObject, string method)
        {
            using (var client = new HttpClient(_config))
            {
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_contentType));
                client.DefaultRequestHeaders.Add("Authorization", String.Format("Bearer {0}", _token));
                client.BaseAddress = new Uri(_uri);
                var myContent = JsonConvert.SerializeObject(requestObject);
                var byteContent = new StringContent(myContent, Encoding.UTF8, "application/json");
                var result = await client.PutAsync(_method, byteContent);
                string resultContent = await result.Content.ReadAsStringAsync();
                var response = JsonConvert.DeserializeObject<PayloadResponse>(resultContent);
                return response;
            }

        }
    }
}
