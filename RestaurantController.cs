using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using CMMIRestaurantReviewsAPI.Models;

namespace CMMIRestaurantReviewsAPI.Controllers
{
    public class RestaurantController : Controller
    {
        RestaurantDataAccessLayer objRestaurant = new RestaurantDataAccessLayer();

        [HttpGet("[action]")]
        [Route("api/Restaurant/Index")]
        public IEnumerable<Restaurant> Index()
        {
            return objRestaurant.GetAllRestaurants();
        }

        [HttpPost]
        [Route("api/Restaurant/Create")]
        public int Create([FromBody] Restaurant restaurant)
        {
            return objRestaurant.AddRestaurant(restaurant);
        }

        [HttpGet]
        [Route("api/Restaurant/ByCity/{name}")]
        public IEnumerable<Restaurant> ByCity(string name)
        {
            return objRestaurant.GetRestaurantsByCity(name);
        }
        

        [HttpDelete]
        [Route("api/Restaurant/Delete/{id}")]
        public int Delete(int id)
        {
            return objRestaurant.DeleteReview(id);
        }
    }
}
