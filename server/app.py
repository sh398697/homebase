import os
from flask import Flask, request, make_response, session, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, DateTime
from datetime import date, datetime, timedelta
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, Coach, Player, Guardian, PlayerGuardian, Team, Game, PlayerGameAvailability, Message

# Instantiate app, set attributes
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)

# Use this to create your tables
with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

CORS(app)

jwt = JWTManager(app)

####################################################################################################

@app.route("/")
def hello():
  return "HomeBase API is running!"

@app.route("/coaches", methods=['GET'])
def get_coaches():
  coaches = []
  for coach in Coach.query.all():
    coach_dict = {
                  "id": coach.id,
                  "fname": coach.fname,
                  "lname": coach.lname,
                  "email": coach.email,
                  "phone": coach.phone,
                  "team_id": coach.team_id,
                  "image_url": coach.image_url
                  }
    coaches.append(coach_dict)
  
  response = make_response(
        coaches,
        200,
        {"Content-Type": "application/json"}
    )
  return response
    

@app.route("/players", methods=['GET'])
def get_players():
  players = []
  for player in Player.query.all():
    player_dict = {
                  "id": player.id,
                  "fname": player.fname,
                  "lname": player.lname,
                  "number": player.number,
                  "team_id": player.team_id,
                  "image_url": player.image_url
                  }
    players.append(player_dict)
  
  response = make_response(
        players,
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/guardians", methods=['GET'])
def get_guardians():
  guardians = []
  for guardian in Guardian.query.all():
    guardian_dict = {
                  "id": guardian.id,
                  "fname": guardian.fname,
                  "lname": guardian.lname,
                  "email": guardian.email,
                  "phone": guardian.phone,
                  "image_url": guardian.image_url
                  }
    guardians.append(guardian_dict)
  
  response = make_response(
        guardians,
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/teams", methods=['GET'])
def get_teams():
  teams = []
  for team in Team.query.all():
    team_dict = {
                  "id": team.id,
                  "name": team.name,
                  "image_url": team.image_url
                  }
    teams.append(team_dict)
  
  response = make_response(
        teams,
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/games", methods=['GET'])
def get_games():
  games = []
  for game in Game.query.all():
    game_dict = {
                  "id": game.id,
                  "home_team_id": game.home_team_id,
                  "away_team_id": game.away_team_id,
                  "status": game.status,
                  "home_team_runs": game.home_team_runs,
                  "away_team_runs": game.away_team_runs,
                  "game_result": game.game_result
                  }
    games.append(game_dict)
  
  response = make_response(
        games,
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/messages", methods=['GET'])
def get_messages():
  messages = []
  for message in Message.query.all():
    message_dict = {
                  "id": message.id,
                  "content": message.content,
                  "team_id": message.team_id,
                  "author_coach_id": message.author_coach_id,
                  "author_guardian_id": message.author_guardian_id,
                  "timestamp": message.timestamp
                  }
    messages.append(message_dict)
  
  response = make_response(
        messages,
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/playerguardians", methods=['GET'])
def get_playerguardians():
  playerguardians = []
  for playerguardian in PlayerGuardian.query.all():
    playerguardian_dict = {
                  "id": playerguardian.id,
                  "player_id": playerguardian.player_id,
                  "guardian_id": playerguardian.guardian_id
                  }
    playerguardians.append(playerguardian_dict)
  
  response = make_response(
        playerguardians,
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/playeravailability", methods=['GET'])
def get_playeravailability():
  playergameavailability = []
  for playergameavailability in PlayerGameAvailability.query.all():
    playergameavailability_dict = {
                  "id": playergameavailability.id,
                  "player_id": playergameavailability.player_id,
                  "game_id": playergameavailability.game_id,
                  "status": playergameavailability.status
                  }
    playergameavailability.append(playergameavailability_dict)
    
  response = make_response(
    playergameavailability,
    200,
    {"Content-Type": "application/json"}
  )
  return response
    
####################################################################################################

if __name__ == "__main__":
  app.run()
