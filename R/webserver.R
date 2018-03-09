library(plumber)
library(jsonlite)
library(dplyr, magrittr)

api <- plumb("get_charge_plan.R")
api$run(port=9000)