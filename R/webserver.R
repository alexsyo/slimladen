library(plumber)
library(jsonlite)
library(dplyr)
library(magrittr)

api <- plumb("R/get_charge_plan.R")
api$run(port=9000)