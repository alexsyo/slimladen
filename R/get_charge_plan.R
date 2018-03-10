#* @serializer unboxedJSON
#* @get /chargePlan
get_charge_plan <- function(location, soc)
{
  source("get_solar_forecasts.R")
  soc <- as.integer(soc)
  #we assume a battery capacity of 85kWh
  #and a charger capacity of 11kW
  battery_capacity <- 85
  charger_capacity <- 11
  speed_of_charge <- battery_capacity/charger_capacity*60*60/100
  
  ptus_to_charge <- ceiling((100 - soc)*speed_of_charge/900)
  
  date <- Sys.Date()
  province <- "Provincie_Noord-Holland"
  city <- "Amsterdam"
  forecasts <- get_solar_forecasts(province, date, city)
  
  start_time <- Sys.time()
  
  if(location=="home") duration <- 8*60*60
    else if (location=="work") duration <- 6*60*60
      else if (location=="out") duration <- 2*60*60
  
  chargingschedule_periods <- forecasts %>%
    filter(datetimeFC > start_time) %>%
      filter(datetimeFC < start_time + duration)
  
  time_available <- nrow(chargingschedule_periods)
  
  chargingschedule_periods %<>%
    arrange(desc(forecast))
  
  if(time_available>ptus_to_charge) 
    chargingschedule_periods %<>%
      mutate(max_current = as.character(c(rep(1,ptus_to_charge), rep(0, n()-ptus_to_charge))))
  else
  chargingschedule_periods %<>% 
    mutate(max_current = as.character(1))
  
  chargingschedule_periods %<>% 
    arrange(datetimeFC) %>%
    mutate(start_period = as.character(seq(0, length.out=n(), by=900))) %>%
    select(max_current, start_period)
  
  schedule <- list(chargingschedule_periods = chargingschedule_periods, 
                   duration=as.character(duration), 
                   start_schedule = format(start_time, "%Y-%m-%dT%H:%M:%S%z"))
  
  schedule
}
