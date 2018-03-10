library(plumber)
library(jsonlite)
library(dplyr)
library(magrittr)

api <- plumb("get_charge_plan.R")
api$run(port=9000)