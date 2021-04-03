# MFR Documentation

## M - MySQL

[MySQL](https://www.mysql.com/) is an open source, SQL compliant relational database. 

Data is stored in tables where predefined column types dictate what data will be stored within them. Relationships are then established through the rows primary id and table columns referencing other tables values as "Foreign Keys". As a result of this predefined behaviour the database is not flexible if the user data changes drastically. Although this tradeoff allows for improved performance in query heavy use cases, although the constraints on columns means that inserts and update may be slower as noted [here](https://severalnines.com/database-blog/mongodb-vs-mysql-nosql-why-mongo-better). 

_A table can be defined as below._

```sql
create table safeat.users
(
    id   int auto_increment primary key,
    name varchar(100) not null
);
```

## F - Flask

[Flask](https://flask.palletsprojects.com/en/1.1.x/) is a web server back-end framework.

Being built with Python in mind allows developers to quickly prototype and deploy solutions for tasks at hand. Providing a high level of abstraction means that REST api endpoints can be quickly built, tested and deployed. As well as with a large quantity of robust libraries for a myriad of tasks means that complex problems can be solved more efficiently by importing the necessary tools. 

_A whole flask application can be made as simply as [below](https://palletsprojects.com/p/flask/)._

```python
from flask import Flask, escape, request

app = Flask(__name__)

@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'
```

## R - React

[React](https://reactjs.org) is a JavaScript library used for building user interfaces.

React is a library that uses Javascript, CSS, and JSX to build encapsulated custom components that manage their own state providing developers the ability to easily build complex UIs.React allows you to design very simple views for each state in the application and React automatically updates and re-renders these views based on changes in the applications data.

A React application can be initialized on any machine with Node and npm as [follows](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app):

```bash
npx create-react-app my-app
cd my-app
npm start
```
