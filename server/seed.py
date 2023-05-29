from flask import Flask
from datetime import datetime, timedelta
from models import db, Team, Coach, Player, Guardian, Message, PlayerGameAvailability, PlayerGuardian, Game
from app import app

if __name__ == '__main__':
    with app.app_context():
        
        print("Starting seed...")

        # Delete existing records
        PlayerGameAvailability.query.delete()
        PlayerGuardian.query.delete()
        Team.query.delete()
        Coach.query.delete()
        Guardian.query.delete()
        Player.query.delete()
        Message.query.delete()
        Game.query.delete()

        # Create coaches
        coach1 = Coach(fname="Joey", lname="Beef", email="joey@beef.com", phone="123-456-7890", password="test", image_url="https://pbs.twimg.com/media/E_gSj9qWUAYh4Wz.jpg:large")
        coach1.set_password("test")
        
        coach2 = Coach(fname="Robert", lname="Tringali", email="robert@tringali.com", phone="123-123-1234", password="test", image_url="https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Coach_Eric_Taylor_FNL_S4.jpg/300px-Coach_Eric_Taylor_FNL_S4.jpg")
        coach2.set_password("test")

        db.session.add(coach1)
        db.session.add(coach2)
        db.session.commit()
        
         # Create teams
        team1 = Team(name="US Beef Newark", coach_id=coach1.id)
        team2 = Team(name="GenWealth Giants", coach_id=coach2.id)

        db.session.add(team1)
        db.session.add(team2)
        db.session.commit()

        # Create players
        player1 = Player(fname="Dylan", lname="Henry", team_id=team1.id)
        player2 = Player(fname="Jay", lname="Smith", team_id=team1.id)
        player3 = Player(fname="Austin", lname="Henry", team_id=team2.id)
        player4 = Player(fname="Sam", lname="Smith", team_id=team2.id)

        db.session.add(player1)
        db.session.add(player2)
        db.session.add(player3)
        db.session.add(player4)
        db.session.commit()

        # Create guardian
        guardian = Guardian(fname="Scott", lname="Henry", email="scott@henry.com")
        guardian.set_password("test")
        
        db.session.add(guardian)
        db.session.commit()

        # Create player-guardian relationships
        player_guardian1 = PlayerGuardian(player_id=player1.id, guardian_id=guardian.id)
        player_guardian2 = PlayerGuardian(player_id=player2.id, guardian_id=guardian.id)
        
        db.session.add(player_guardian1)
        db.session.add(player_guardian2)
        db.session.commit()
        
        # Create games
        game1 = Game(date=(datetime.now() + timedelta(days=7)), home_team_id=1, away_team_id=2, location="Meadowlands Field 2", status="scheduled", home_team_runs='', away_team_runs='', game_result="pending")
        
        game2 = Game(date=(datetime.now() + timedelta(days=14)), home_team_id=2, away_team_id=1, location="MapleCrest Park", status="scheduled", home_team_runs='', away_team_runs='', game_result="pending")
        
        db.session.add(game1)
        db.session.add(game2)
        db.session.commit()

        # Create messages
        message1 = Message(content="Welcome to US Beef Newark!", author_coach_id=coach1.id, team_id=team1.id, timestamp=datetime.utcnow())
        message2 = Message(content="Welcome to the GenWealth Giants!", author_coach_id=coach2.id, team_id=team2.id, timestamp=datetime.utcnow())
        message3 = Message(content="Thanks coach!", author_guardian_id=guardian.id, team_id=team1.id, timestamp=datetime.utcnow())
        message4 = Message(content="Thanks coach!", author_guardian_id=guardian.id, team_id=team2.id, timestamp=datetime.utcnow())

        db.session.add(message1)
        db.session.add(message2)
        db.session.add(message3)
        db.session.add(message4)

        # Commit the session to the database
        db.session.commit()

        print("Seeding complete!")
