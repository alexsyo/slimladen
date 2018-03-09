get_profiles <- function()
{
  home_profiles <- read.csv("data/Daily_profiles.xlsx - Private_charging.csv", 
                            col.names = c("datetimeFC", "home_Weekdays", "home_WeekendDays"))
  home_profiles$datetimeFC <- as.POSIXct(strptime(home_profiles$datetimeFC, "%H:%M"))
  work_profiles <- read.csv("data/Daily_profiles.xlsx - Workplace_charging.csv",
                            col.names = c("datetimeFC", "work_Weekdays", "work_WeekendDays"))
  work_profiles$datetimeFC <- as.POSIXct(strptime(work_profiles$datetimeFC, "%H:%M"))
  out_profiles <- read.csv("data/Daily_profiles.xlsx - Public_charging.csv",
                           col.names = c("datetimeFC", "out_Weekdays", "out_WeekendDays"))
  out_profiles$datetimeFC <- as.POSIXct(strptime(out_profiles$datetimeFC, "%H:%M"))
  profiles <- merge(home_profiles, work_profiles, by="datetimeFC")
  merge(profiles, out_profiles, by="datetimeFC")
}