library(jsonlite)
library(dplyr, magrittr)
library(ggplot2)

province <- "Provincie_Noord-Holland"
date <- Sys.Date()
city <- "Amsterdam"

city_forecast <- get_solar_forecasts(province, date, city)

home_profiles <- read.csv("Daily_profiles.xlsx - Private_charging.csv", 
                          col.names = c("datetimeFC", "home_Weekdays", "home_WeekendDays"))
home_profiles$datetimeFC <- as.POSIXct(strptime(home_profiles$datetimeFC, "%H:%M"))
work_profiles <- read.csv("Daily_profiles.xlsx - Workplace_charging.csv",
                          col.names = c("datetimeFC", "work_Weekdays", "work_WeekendDays"))
work_profiles$datetimeFC <- as.POSIXct(strptime(work_profiles$datetimeFC, "%H:%M"))
out_profiles <- read.csv("Daily_profiles.xlsx - Public_charging.csv",
                         col.names = c("datetimeFC", "out_Weekdays", "out_WeekendDays"))
out_profiles$datetimeFC <- as.POSIXct(strptime(out_profiles$datetimeFC, "%H:%M"))

city_forecast <- merge(city_forecast, home_profiles, by="datetimeFC")
city_forecast <- merge(city_forecast, work_profiles, by="datetimeFC")
city_forecast <- merge(city_forecast, out_profiles, by="datetimeFC")

charging_sessions <- read.csv("Charging_profiles.xlsx - Transactions.csv")

charging_profiles <- read.csv("Charging_profiles.xlsx - Meterreadings.csv") %>%
  select(datetimeFC = UTCTime, AveragePower)
charging_profiles$datetimeFC <- as.POSIXct(strptime(charging_profiles$datetimeFC, "%d/%m/%Y %H:%M:%S"))
city_forecast <- merge(city_forecast, charging_profiles, by="datetimeFC")

plot(city_forecast$datetimeFC, city_forecast$home_WeekendDays, type='l')

plot(city_forecast$datetimeFC, city_forecast$forecast, type='l' )
par(new = T)
plot(city_forecast$datetimeFC, city_forecast$home_Weekdays, type='l', col="RED", axes = F, xlab=NA, ylab=NA)
lines(city_forecast$datetimeFC, city_forecast$work_WeekendDays, type='l', col="BLUE")
lines(city_forecast$datetimeFC, city_forecast$home_Weekdays, type='l', col="BROWN")
lines(city_forecast$datetimeFC, city_forecast$work_Weekdays, type='l', col="PURPLE")
lines(city_forecast$datetimeFC, city_forecast$out_Weekdays, type='l', col="ORANGE")
lines(city_forecast$datetimeFC, city_forecast$out_WeekendDays, type='l', col="GREEN")
axis(side = 4)
mtext(side = 4, line = 3, 'Number of sessions')

summary(city_forecast$forecast)
