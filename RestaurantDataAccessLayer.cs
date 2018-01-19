using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMMIRestaurantReviewsAPI.Models
{
    public class RestaurantDataAccessLayer
    {
        string connectionString = "Server=(localdb)\\mssqllocaldb;Database=CMMI;Trusted_Connection=True;MultipleActiveResultSets=true";

        //To View all Restaurant details
        public IEnumerable<Restaurant> GetAllRestaurants()
        {
            try
            {
                List<Restaurant> lstrestaurant = new List<Restaurant>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllRestaurants", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Restaurant restaurant = new Restaurant();

                        restaurant.ID = Convert.ToInt32(rdr["RestaurantID"]);
                        restaurant.Name = rdr["Name"].ToString();
                        restaurant.City = rdr["City"].ToString();
                        restaurant.Type = rdr["Type"].ToString();
                        restaurant.Image = rdr["Image"].ToString();
                        restaurant.Rating = Convert.ToDouble(rdr["Rating"].ToString());
                        
                        lstrestaurant.Add(restaurant);
                    }
                    con.Close();
                }
                return lstrestaurant;
            }
            catch
            {
                throw;
            }
        }

        //To Add new Restaurant record 
        public int AddRestaurant(Restaurant restaurant)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddRestaurant", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Name", restaurant.Name);
                    cmd.Parameters.AddWithValue("@City", restaurant.City);
                    cmd.Parameters.AddWithValue("@Type", restaurant.Type);
                    cmd.Parameters.AddWithValue("@Image", restaurant.Image);
                    cmd.Parameters.AddWithValue("@Rating", restaurant.Rating);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }


        //Get  Restaurant by city
        public IEnumerable<Restaurant> GetRestaurantsByCity(string name)
        {
            try
            {

                List<Restaurant> lstrestaurant = new List<Restaurant>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM Restaurant WHERE City= " + "'" + name + "'";
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Restaurant restaurant = new Restaurant();

                        restaurant.ID = Convert.ToInt32(rdr["RestaurantID"]);
                        restaurant.Name = rdr["Name"].ToString();
                        restaurant.City = rdr["City"].ToString();
                        restaurant.Type = rdr["Type"].ToString();
                        restaurant.Image = rdr["Image"].ToString();
                        restaurant.Rating = Convert.ToDouble(rdr["Rating"].ToString());

                        lstrestaurant.Add(restaurant);
                    }
                }
                return lstrestaurant;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular Review
        public int DeleteReview(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteReview", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ReviewId", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
