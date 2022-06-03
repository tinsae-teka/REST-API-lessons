from flask import Flask, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.utils import redirect
app = Flask(__name__)

app.config[SQLALCHEMY_DATABASE_URI] = 'sqlite:///myapp.sqlite'
app.config[SQLALCHEMY_TRACK_MODIFICATIONS] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Myapp(db.Model):
   order_id = db.Column(db.Integer, primary_key = True)
   size = db.Column(db.String(500))
   toppings = db.Column(db.String(500))
   crust = db.Column(db.String(500))


class MyAppSchema(ma.Schema):
    class Meta:
        fields = ('order_id','size', 'toppings','crust' )


my_app_schema = MyAppSchema(many=True)


@app.route('/')
def hello():
    return 'hellow hellow big hellow from flask server'

@app.route('/order')          
def get_order():       
        entries = Myapp.query.all()
        result = my_app_schema.dump(entries)
        return jsonify(result)
   
 
if __name__ == '__main__'  :
    db.create.all()
    #app.run() 
    app.run(host='0.0.0.0', port=105, debug='true')
    
