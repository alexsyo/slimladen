get_solar_forecasts <- function(province, date, city)
{
  base_url <- "https://acc-data.icarus.energy/api/forecast?"
  provinceParam <- paste0("key=", province)
  dateParam <- paste0("fromDate=", date)
  req <- httr::GET(paste0(base_url, provinceParam, "&", dateParam),
                   httr::add_headers(
                     "Authorization" = paste("Basic", "aWNhcnVzYWNjYXBpOkJ5NHJJbnly"))
  )
  
  json <- httr::content(req, as = "text")
  
  city_forecast <- fromJSON(json) %>%
    filter(grepl(city,prediction_description)) %>%
    filter(grepl("Solar",prediction_description)) %>%
    select(forecasts)
  
  city_forecast <- as.data.frame(city_forecast[1,1])  
  city_forecast$datetimeFC <- as.POSIXct(strptime(city_forecast$datetimeFC, "%Y-%m-%dT%H:%M:%S%z"))
  city_forecast
}