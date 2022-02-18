# news-app

# Assumption
  The field, **author_name** in the table, **feed** is a string and not a foreign key to a users table

<br />
  
# Commands

## Run project  
     npm install
     npm start
     
## Run tests 
     npm test

<br /><br />

# API Docs
  
  ## GET /feed
  
  **Query**
  
  | Field      | Type    |
  | ---------- | -------:|
  | offset     | number  |
  | limit      | number  |
  
  
  ## GET /feed/article/:id
  
  **Paramters**
  
  | Field      | Type    |
  | ---------- | -------:|
  | id         | number  |
  
  
  ## POST /feed/search
  
  **Query**
  
  | Field      | Type    |
  | ---------- | -------:|
  | offset     | number  |
  | limit      | number  |
  
  **Payload**
  
  | Field         | Type    |
  | ------------- | -------:|
  | searchString  | string  |
  
  
  ## POST /users/create/
  
  **Payload**
  
  | Field           | Type    |
  | --------------- | -------:|
  | username        | string  |
  | email           | string  |
  | password        | string  |
  | phone_number    | string  |
  | date_of_birth   | string  |
  | time_of_birth   | string  |
  | marital_status  | string  |
  | language        | string  |
  | profile_picture | string  |

