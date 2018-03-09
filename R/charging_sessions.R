charging_sessions <- read.csv("data/Charging_profiles.xlsx - Transactions.csv")

charging_profiles <- read.csv("data/Charging_profiles.xlsx - Meterreadings.csv") %>%
  select(datetimeFC = UTCTime, AveragePower)
charging_profiles$datetimeFC <- as.POSIXct(strptime(charging_profiles$datetimeFC, "%d/%m/%Y %H:%M:%S"))
city_forecast <- merge(city_forecast, charging_profiles, by="datetimeFC")
