#!/bin/bash
lt --port 9000 --subdomain vandebron1 & 
lt --port 8000 --subdomain vandebron2 & 
Rscript R/webserver.R & 
node server/index.js