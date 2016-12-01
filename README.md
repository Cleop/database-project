# database-project

## To View Our Site
- Clone our repo
- Do npm install in your terminal
- Do run devStart, once the server is running...
- Go to localhost:8000 on your browser

To login try using:
email: peter@fac.com || cleo@fac.com || tom@fac.com || ewelina@fac.com
password: name123 (the name of the user)

## Objective

Build a platform for writing and sharing reviews of coding resources.

## User stories:

- I can log in.
- I can see a list of recent reviews.
- I can see a list of reviewed resources.
- I can create, edit and view my own reviews.
- I can see a list of reviews of a particular resource.
- I can click on a listed review to read it.
- (optional extra) I can see a list of reviews by a particular user.

Focus on getting this functionality rather than making the frontend look good. Build your endpoints first.

## Endpoints

- I can log in.  (/login)
- I can see a list of recent reviews. (/reviews/recent on the landing page)
- I can see a list of reviewed resources. (/resources?reviewed=true)
- I can create, (edit) and view my own reviews. (/reviews)
- I can see a list of reviews of a particular resource. (resources/{resource_id})
- I can click on a listed review to read it. (/resources/{resource_id})

## Database

Table 1: Users

|name            |value          |   type     |
|----------------|---------------|------------|
| **user_id**    |1              |PRIMARY KEY |   
| **first_name** |Jo             |string      |
| **last_name**  |Bloggs         |string      |   
| **email**      |jbloggs@me.com |string      |   
| **password**   |h3Llo          |string      |   

Table 2: Resources

|name            |  type             |
|----------------|-------------------|
|**resource_id** |PRIMARY KEY        |   
|**url**         |string             |
|**title**       |string             |   
|**img**         |string             |   
|**intro**       |string varchar(100)|

Table 3: Reviews

|name            |  type             |
|----------------|-------------------|
|**review_id**   |PRIMARY KEY        |   
|**title**       |string             |
|**rating**      |integer            |   
|**content**     |string             |   
|**created_at**  |time stamp         |
|**modified_at** |time stamp         |


Table 4 User Reviews:

|name            |  type             |
|----------------|-------------------|
|**ur_id**       |PRIMARY KEY        |   
|**review_id**   |FOREIGN KEY        |
|**user_id**     |FOREIGN KEY        |   
|**resource_id** |FOREIGN KEY        |   


## Stretch Goals
- Create new users
- Add nice styling to the frontend
- Nightwatch testing
