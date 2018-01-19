using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMMIRestaurantReviewsAPI.Models
{
    public class Restaurant
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        public string Type { get; set; }

        public string Image { get; set; }

        public double Rating { get; set; }
    }
}
