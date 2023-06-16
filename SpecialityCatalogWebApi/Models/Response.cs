namespace SpecialityCatalogWebApi.Models
{
    public class Response
    {
        public bool Success { get; set; } = false;

        public string? ErrorMsg { get; set; }

        public int Code { get; set; }

        public string? SuccessMsg { get; set; }

        public object? Result { get; set; }
    }
}
