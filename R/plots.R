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
