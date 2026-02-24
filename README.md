# Gator CLI

This is my RSS feed aggregator project built with TypeScript, Node.js,
PostgreSQL, and Drizzle ORM.

In this project, I created a CLI tool that allows users to: - Register
and log in - Follow / unFollow RSS feeds - Fetch posts from those feeds - Save
posts in a database - Browse the latest posts

------------------------------------------------------------------------

## Requirements

To run this project, you need: - Node.js - npm - PostgreSQL

------------------------------------------------------------------------

## Installation

Clone the repository:

git clone https://github.com/ahmadissa22145-cell/Gator
cd gator

Install dependencies:

npm install

------------------------------------------------------------------------

## Database Setup

Create a PostgreSQL database:

CREATE DATABASE gator;

Set your database connection string in the project.

Run migrations:

npm run migrate

------------------------------------------------------------------------

## How to Run

All commands use:

npm run start <command>

### Register - Create a new user

npm run start register <username> 

### Login - Log in as an existing user

npm run start login <username>

### Reset - Delete all users
 
npm run start reset

### Users - Show all registered users

npm run start users

### Add Feed - Add a new RSS feed

npm run start addfeed <feed_name> <feed_url>

### Feeds - List all feeds

npm run start feeds

### Follow a feed - Follow a specific feed

npm run start follow <feed_url>

### Unfollow - Stop following a feed

npm run start unfollow <feed_url>

### Following - Show feeds you follow

npm run start following

### agg - Start fetching feeds

npm run start agg <durationStr> (e.g. 1ms, 2s, 5m, 3h)

### Browse - Browse posts

npm run start browse <limit> (default is 2)

------------------------------------------------------------------------

## Example

npm run start register Ahmad
npm run start login Ahmad
npm run start follow https://hnrss.org/newest
npm run start agg 5s
(Press Ctrl+C to stop)
npm run start browse 5
