extract_forecast <- function()
{
  source("get_solar_forecasts.R")
  source("get_profiles.R")
  
  date <- Sys.Date()
  province <- "Provincie_Noord-Holland"
  city <- "Amsterdam"
  
  city_forecast <- get_solar_forecasts(province, date, city)
  profiles <- get_profiles()
  
  merge(city_forecast, profiles, by="datetimeFC")
}
