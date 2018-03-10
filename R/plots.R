library(jsonlite)
library(dplyr, magrittr)
library(ggplot2)
source("extract_forecast.R")

#remove scientific notation
options(scipen=999)

city_forecast <- extract_forecast()
plot(city_forecast$datetimeFC, 
     city_forecast$forecast, 
     type='l',
     xlab = "Time of day",
     ylab = "Solar Production Forecast (kWh)")
title("Solar production forecast")
par(new = T)
plot(city_forecast$datetimeFC, city_forecast$home_Weekdays, type='l', col="RED", axes = F, xlab=NA, ylab=NA)
axis(side = 4)
mtext(side = 4, line = 3, 'Avg Number of sessions')
lines(city_forecast$datetimeFC, city_forecast$work_Weekdays, type='l', col="BLUE")
legend(1, 95, legend=c("Line 1", "Line 2"),
       col=c("red", "blue"), lty=1:2, cex=0.8)

lines(city_forecast$datetimeFC, city_forecast$out_Weekdays, type='l', col="GREEN")

summary(city_forecast$forecast)
