What's the number (1,2,3,…) product that has the (most, second most, … least) complaints in the State of (AL, FL, NY,…)?
How many people were born between (start date) to (end date) in all the (cities OR states) that (bank name) received a consumer complaint in?
How many complaints about (product) are there in the fastest growing state?



https://dev.socrata.com/foundry/data.consumerfinance.gov/jhzv-w97w

http://www.census.gov/data/developers/data-sets/population-estimates-and-projections.html

Dev:
heroku local  IN ROOT
webpack -w IN ROOT

maintain single source of truth -> origin master
clone and branch from master -> pull requests into master (CI pass) -> origin master live (delete all ancillary branches)
checkout local master -> git pull —rebase origin master (delete all other local branches)

Continuous Integration + Deployment
(Travis + Heroku)

.travis.yml and register both on heroku site CI-enabled automatic deployment and Travis site

PROJECT ESTIMATION:
Design database ~ 4 hrs
Implement database ~ 48 hrs

implement v2 of API w/ database ~ 10 hrs
(7pm - 3am) + (1pm - 4pm)

implement heroku node schedulers ~ 6 hrs
(5pm - ?? pm)

Complaints 100 of ~590,000 from API
need to schedule polling of complaints frequently (around 10k each hour)

Heroku is based on Postgres, use postgres
- do not use mysql for heroku
- ClearDB connection issues for mysql

