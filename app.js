const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/Start.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/patient-profile',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/profile.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/live-data',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/LiveRecord.html'));
});

router.get('/history',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/History.html'));
});

router.get('/manual-upload',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/ManualUpload.html'));
});

router.get('/medicine-time',function(req,res){
    res.sendFile(path.join(__dirname+'/templates/MedTime.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');
