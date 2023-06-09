import os
from flask import Flask, request, make_response, session, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, DateTime, Date
from datetime import date, datetime, timedelta
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, Coach, Player, Parent, PlayerParent, Team, Game

# Instantiate app, set attributes
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.config['JWT_SECRET_KEY'] = '2b5faaf05ca77b1e23aa9f3e1c05d840'

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
                  "image_url": coach.image_url
                  }
    coaches.append(coach_dict)
  
  response = make_response(
        coaches,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/coaches", methods=['POST'])
def create_coach():
  data = request.get_json()
  coach = Coach(fname=data['fname'], lname=data['lname'], email=data['email'], phone=data['phone'], image_url=data['image_url'], password=data['password'])
  coach_dict = {
                  "fname": coach.fname,
                  "lname": coach.lname,
                  "email": coach.email,
                  "phone": coach.phone,
                  "password": coach.password_hash,
                  "image_url": coach.image_url
                  }
  db.session.add(coach)
  db.session.commit()
  response = make_response(
        coach_dict,
        201,
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

@app.route("/players", methods=['POST'])
def create_player():
  data = request.get_json()
  player = Player(fname=data['fname'], lname=data['lname'], number=data['number'], team_id=data['team_id'], image_url=data['image_url'])
  db.session.add(player)
  db.session.commit()

  player_id = player.id

  player_dict = {
                  "id": player_id,
                  "fname": player.fname,
                  "lname": player.lname,
                  "age": player.age,
                  "number": player.number,
                  "image_url": player.image_url,
                  "team_id": player.team_id
                }
  
  response = make_response(
        jsonify(player_dict),
        201,
        {"Content-Type": "application/json"}
    )
  return response



@app.route("/parents", methods=['GET'])
def get_parents():
  parents = []
  for parent in Parent.query.all():
    parent_dict = {
                  "id": parent.id,
                  "fname": parent.fname,
                  "lname": parent.lname,
                  "email": parent.email,
                  "phone": parent.phone,
                  "image_url": parent.image_url
                  }
    parents.append(parent_dict)
  
  response = make_response(
        parents,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/parents", methods=['POST'])
def create_parent():
  data = request.get_json()
  parent = Parent(fname=data['fname'], lname=data['lname'], email=data['email'], phone=data['phone'], image_url=data['image_url'], password=data['password'])
  parent_dict = {
                  "fname": parent.fname,
                  "lname": parent.lname,
                  "email": parent.email,
                  "phone": parent.phone,
                  "password": parent.password_hash,
                  "image_url": parent.image_url
                  }
  db.session.add(parent)
  db.session.commit()
  response = make_response(
        parent_dict,
        201,
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
                  "image_url": team.image_url,
                  "coach_id": team.coach_id
                  }
    teams.append(team_dict)
  
  response = make_response(
        teams,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/teams/<int:team_id>", methods=['GET'])
def get_team(team_id):
  team = Team.query.filter_by(id=team_id).first()
  team_dict = {
                  "id": team.id,
                  "name": team.name,
                  "image_url": team.image_url,
                  "coach_id": team.coach_id
                  }
  response = make_response(
        team_dict,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/teams", methods=['POST'])
def create_team():
  data = request.get_json()
  team = Team(name=data['name'], image_url=data['image_url'], coach_id=data['coach_id'])
  team_dict = {
                  "name": team.name,
                  "image_url": team.image_url,
                  "coach_id": team.coach_id
                  }
  db.session.add(team)
  db.session.commit()
  response = make_response(
        team_dict,
        201,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/games", methods=['GET'])
def get_games():
  games = []
  for game in Game.query.all():
    game_dict = {
                  "id": game.id,
                  "date": datetime.strftime(game.date, '%Y-%m-%d'),
                  "home_team_id": game.home_team_id,
                  "away_team_id": game.away_team_id,
                  "status": game.status,
                  "location": game.location,
                  "home_team_runs": game.home_team_runs,
                  "away_team_runs": game.away_team_runs
                  }
    games.append(game_dict)
  
  response = make_response(
        games,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/games", methods=['POST'])
def create_game():
  data = request.get_json()
  gameDateTime = data['date']

  format = '%Y-%m-%d'
  # convert from string format to datetime format
  newGameDateTime = datetime.strptime(gameDateTime, format).date()
  
  game = Game(date=newGameDateTime, home_team_id=data['home_team_id'], away_team_id=data['away_team_id'], status='scheduled', home_team_runs='', away_team_runs='', location=data['location'])
  game_dict = {
                  "date": game.date,
                  "home_team_id": game.home_team_id,
                  "away_team_id": game.away_team_id,
                  "status": game.status,
                  "location": game.location,
                  "home_team_runs": game.home_team_runs,
                  "away_team_runs": game.away_team_runs
                  }
  db.session.add(game)
  db.session.commit()
  response = make_response(
        game_dict,
        201,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/games/<int:id>", methods=['PATCH'])
def update_game(id):
  data = request.get_json()
  gameDateTime = data['date']

  format = '%Y-%m-%d'
  # convert from string format to datetime format
  newGameDateTime = datetime.strptime(gameDateTime, format).date()
  
  game = Game.query.get(id)
  game.date = newGameDateTime
  game.home_team_id = data['home_team_id']
  game.away_team_id = data['away_team_id']
  game.location = data['location']
  game.status = data['status']
  game.home_team_runs = data['home_team_runs']
  game.away_team_runs = data['away_team_runs']
  
  game_dict = {
        'location': game.location,
        'date': game.date,
        'status': game.status,
        'home_team_id': game.home_team_id,
        'away_team_id': game.away_team_id,
        'home_team_runs': game.home_team_runs,
        'away_team_runs': game.away_team_runs
  }

  db.session.add(game)
  db.session.commit()
  response = make_response(
        game_dict,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/games/<int:id>", methods=['DELETE'])
def delete_game(id):
  game = Game.query.get(id)
  db.session.delete(game)
  db.session.commit()
  response = make_response(
        "Game deleted",
        200,
        {"Content-Type": "application/json"}
    )
  return response


@app.route("/playerparents", methods=['GET'])
def get_playerparents():
  playerparents = []
  for playerparent in PlayerParent.query.all():
    playerparent_dict = {
                  "id": playerparent.id,
                  "player_id": playerparent.player_id,
                  "parent_id": playerparent.parent_id
                  }
    playerparents.append(playerparent_dict)
  
  response = make_response(
        playerparents,
        200,
        {"Content-Type": "application/json"}
    )
  return response

@app.route("/playerparents", methods=['POST'])
def create_playerparent():
  data = request.get_json()
  playerparent = PlayerParent(player_id=data['player_id'], parent_id=data['parent_id'])
  playerparent_dict = {
                  "player_id": playerparent.player_id,
                  "parent_id": playerparent.parent_id
                  }
  db.session.add(playerparent)
  db.session.commit()
  response = make_response(
        playerparent_dict,
        201,
        {"Content-Type": "application/json"}
    )
  return response


@app.route('/coachlogin', methods=['POST'])
def coachlogin():
  email = request.json.get('email')
  password = request.json.get('password')
  coach = Coach.query.filter_by(email=email).first()
  if not coach or not coach.check_password(password):
    return make_response(
      {"error": "Invalid email or password"},
      401,
      {"Content-Type": "application/json"}
    )
  token = create_access_token(identity=coach.id)
  response = make_response(
  {"token": token},
  200,
  {"Content-Type": "application/json"}
  )
  # Set the cookie with an expiration time of 24 hours
  expires = datetime.now() + timedelta(days=1)
  response.set_cookie("token", token, expires=datetime.utcnow() + timedelta(days=1))
  return response

@app.route('/parentlogin', methods=['POST'])
def parentlogin():
  email = request.json.get('email')
  password = request.json.get('password')
  parent = Parent.query.filter_by(email=email).first()
  if not parent or not parent.check_password(password):
    return make_response(
      {"error": "Invalid email or password"},
      401,
      {"Content-Type": "application/json"}
    )
  token = create_access_token(identity=parent.id)
  response = make_response(
  {"parent_token": token},
  200,
  {"Content-Type": "application/json"}
  )
  # Set the cookie with an expiration time of 24 hours
  expires = datetime.now() + timedelta(days=1)
  response.set_cookie("parent_token", token, expires=datetime.utcnow() + timedelta(days=1))
  return response

@app.route('/coacheslogout', methods=['POST'])
def coacheslogout():
  
  response = make_response(
    {"message": "Successfully logged out"},
    200,
    {"Content-Type": "application/json"}
  )
  # Set the cookie with an expiration time of 24 hours
  expires = datetime.now() - timedelta(days=1)
  response.set_cookie("token", "", expires=expires)
  return response

@app.route('/parentlogout', methods=['POST'])
def parentlogout():
  
  response = make_response(
    {"message": "Successfully logged out"},
    200,
    {"Content-Type": "application/json"}
  )
  # Set the cookie with an expiration time of 24 hours
  expires = datetime.now() - timedelta(days=1)
  response.set_cookie("parent_token", "", expires=expires)
  return response


@app.route('/get-coach-data', methods=['GET'])
@jwt_required()
def get_coach_data():
    coach_id = get_jwt_identity()
    coach = Coach.query.get(coach_id)

    if coach:
        coach_dict = {
            "id": coach.id,
            "fname": coach.fname,
            "lname": coach.lname,
            "email": coach.email,
            "phone": coach.phone,
            "image_url": coach.image_url
        }
        response = make_response(
            coach_dict,
            200,
            {"Content-Type": "application/json"}
        )
    else:
        response = make_response(
            {"error": "User not found"},
            404,
            {"Content-Type": "application/json"}
        )

    return response
  
@app.route('/get-parent-data', methods=['GET'])
@jwt_required()
def get_parent_data():
    parent_id = get_jwt_identity()
    parent = Parent.query.get(parent_id)

    if parent:
        parent_dict = {
            "id": parent.id,
            "fname": parent.fname,
            "lname": parent.lname,
            "email": parent.email,
            "phone": parent.phone,
            "image_url": parent.image_url
        }
        response = make_response(
            parent_dict,
            200,
            {"Content-Type": "application/json"}
        )
    else:
        response = make_response(
            {"error": "User not found"},
            404,
            {"Content-Type": "application/json"}
        )

    return response
    
####################################################################################################

if __name__ == "__main__":
  app.run()
