SWEN-200 starter-store
======================

This repository contains the group semester project for 201710-SWEN-200.

The "starter" code here is heavily inspired by the "ToDo" example from backbonejs:

<http://backbonejs.org/#examples-todos>

However rather than managing "To Do" items, this program manages "Notes".

The intent is that this will be useful as a "working (but not complete) example".

Students in this class will be divided into two teams.

At any given time each team will have primary responsibility for either:

A) server: REST_API + business logic/middleware

*or*

B) client: Browser GUI/front end code

This is an intensive 9+ week course. We'll break it down
into sections roughly as follows:

Week 1: get familiar with: git, docker, javascript/node

Week 2: get familiar with Node, Express, MongoDB, Backbone

Week 3: sprint 1: develop some core functions w/Unit Testing, TDD, BDD etc.

Week 4: sprint 1: (also develop more formal requirements/specs)

Week 5: review, develop core design, architecture, UML, and all that

Week 6: sprint 2: (more functionality + Integration Testing)

Week 7: sprint 2: (explore Continuous Integration)

Week 8: review + Deployment

Week 9: Acceptance Testing, Q/A, Final presentation

Docker Notes:

1) To build local images run "docker-compose build"

2) To run the server run "docker-compose up", then point to the container IP at port 3000.

3) To run misc, build/debug scripts use:

cd bikestoreproject-developers

docker run --rm -t -i -v $PWD:/app -v /app/node_modules bikestoreprojectdevelopers_web /bin/sh

Or something equivalent for your environment.

Then at the command prompt type "npm buildcss", "npm watchjs" etc.

For server tests be sure to include network: --net bikestoreprojectdevelopers_default before image name.

for karma you'll need to forward port 9876.

You can get all this from the command line below:

docker run --rm -t -i -v $PWD:/app -v /app/node_modules --net bikestoreprojectdevelopers_default -p 9876:9876 bikestoreprojectdevelopers_web /bin/sh

4) To run the mongo client against the database(s) use:

docker exec -i -t bikestoreprojectdevelopers_mongo_1 /bin/bash

(this exectutes a new process in a running container)

5) To run test ./node_modules/.bin/mocha test/"Test you want to run"
