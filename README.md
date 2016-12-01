# database-project

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
- I can see a list of recent reviews. (/reviews/recent)
- I can see a list of reviewed resources. (/resources/reviewed)
- I can create, edit and view my own reviews. (/reviews?user_id)
- I can see a list of reviews of a particular resource. (/reviews?resource_id)
- I can click on a listed review to read it. (/reviews/{review_id})
- (optional extra) I can see a list of reviews by a particular user.

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
