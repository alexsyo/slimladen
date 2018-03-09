library(jsonlite)
library(dplyr, magrittr)
library(ggplot2)
source("get_solar_forecasts.R")

province <- "Provincie_Noord-Holland"
date <- Sys.Date()
city <- "Amsterdam"

forecasts <- get_solar_forecasts(province, date, city)

home_profiles <- read.csv("data/Daily_profiles.xlsx - Private_charging.csv", 
                          col.names = c("datetimeFC", "home_Weekdays", "home_WeekendDays"))
home_profiles$datetimeFC <- as.POSIXct(strptime(home_profiles$datetimeFC, "%H:%M"))
work_profiles <- read.csv("data/Daily_profiles.xlsx - Workplace_charging.csv",
                          col.names = c("datetimeFC", "work_Weekdays", "work_WeekendDays"))
work_profiles$datetimeFC <- as.POSIXct(strptime(work_profiles$datetimeFC, "%H:%M"))
out_profiles <- read.csv("data/Daily_profiles.xlsx - Public_charging.csv",
                         col.names = c("datetimeFC", "out_Weekdays", "out_WeekendDays"))
out_profiles$datetimeFC <- as.POSIXct(strptime(out_profiles$datetimeFC, "%H:%M"))

forecasts <- merge(forecasts, home_profiles, by="datetimeFC")
forecasts <- merge(forecasts, work_profiles, by="datetimeFC")
forecasts <- merge(forecasts, out_profiles, by="datetimeFC")