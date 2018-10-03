let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');
let db = mongojs('mongodb://useris1:useris1@ds141952.mlab.com:41952/messenger', ['messages']);

//get all messages
router.get('/messages', function (req, res, next) {
    db.messages.find(function (err, messages) {
        if (err) {
            res.send(err);
        }        
        res.json(messages);
    });

});
   

//get one message
router.get('/message/:id', function (req, res, next) {
        db.messages.findOne({ _id: mongojs.ObjectId(req.params.id)}, function (err, message) {
        if (err) {
            res.send(err);
        }       
        res.json(message);
    });
   
});


//save message
router.post('/message', function (req, res, next) {
    let message = req.body;
    if (!message.receiver || !message.message) {
        res.status(400);
        res.json({
            "error": "no message data"
        });
    } else {
        db.messages.save(message, function (err, message) {
            if (err) {
                res.send(err)
            }
            res.json(message);


        });
    }

});

//delete message
router.delete('/message/:id', function (req, res, next) {
    db.messages.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, message) {
        if (err) {
            res.send(err);
        }
        res.json(message);
    });

});

//update message
router.put('/message/:id', function (req, res, next) {
    let message = req.body; 
    let updMessage = {};
    
           
    if (message.receiver) {
        updMessage.receiver = message.receiver;
    }
    if (message.message) {
        updMessage.message = message.message;
    }

    if (!updMessage) {
        res.status(400);
        res.json({
            "error": "wrong message object"
        });
    } else {
        db.messages.update({ _id: mongojs.ObjectId(req.params.id) }, updMessage, {}, function (err, message) {
            if (err) {
                res.send(err);
            }
            res.json(message);
        });
    }

    

});



module.exports = router;