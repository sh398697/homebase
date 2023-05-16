from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()
    
class Coach(db.Model):
    __tablename__ = 'coach'
    
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(100))
    image_url = db.Column(db.String(300))
    password_hash = db.Column(db.String(128))
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Player(db.Model):
    __tablename__ = 'player'
    
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100))
    date_of_birth = db.Column(db.Date)
    number = db.Column(db.String(100))
    image_url = db.Column(db.String(300))
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    
    guardians = db.relationship('Guardian', secondary='player_guardian', backref='player')
    game_availability = db.relationship('PlayerGameAvailability', back_populates='player')


class Guardian(db.Model):
    __tablename__ = 'guardian'
    
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    phone = db.Column(db.String(100))
    image_url = db.Column(db.String(300))
    password_hash = db.Column(db.String(128))
    
    players = db.relationship('Player', secondary='player_guardian', backref='guardian')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class PlayerGuardian(db.Model):
    __tablename__ = 'player_guardian'
    
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    guardian_id = db.Column(db.Integer, db.ForeignKey('guardian.id'), nullable=False)
    relationship_type = db.Column(db.String(100))

class Game(db.Model):
    __tablename__ = 'game'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    home_team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    away_team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, server_default='scheduled')
    home_team_runs = db.Column(db.Integer, nullable=False)
    away_team_runs = db.Column(db.Integer, nullable=False)
    game_result = db.Column(db.String(100))
    
    player_availability = db.relationship('PlayerGameAvailability', back_populates='game')


class PlayerGameAvailability(db.Model):
    __tablename__ = 'player_game_availability'

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    game = db.relationship('Game', back_populates='player_availability')
    player = db.relationship('Player', back_populates='game_availability')


class Team(db.Model):
    __tablename__ = 'team'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(300))
    
    home_games = db.relationship('Game', foreign_keys='Game.home_team_id', backref='home_team', lazy=True)
    away_games = db.relationship('Game', foreign_keys='Game.away_team_id', backref='away_team', lazy=True)
    team_players = db.relationship('Player', backref='team', foreign_keys=[Player.team_id])


class Message(db.Model):
    __tablename__ = 'message'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    author_coach_id = db.Column(db.Integer, db.ForeignKey('coach.id'))
    author_guardian_id = db.Column(db.Integer, db.ForeignKey('guardian.id'))
