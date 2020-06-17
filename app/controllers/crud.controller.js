const _ = require('lodash');
const R = require('ramda')
const csv=require('csvtojson');

// Upload CSV files
exports.upload = (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = []; 
    
            //loop all files
            _.forEach(_.keysIn(req.files), (key) => {
                let csv = req.files[key];
                //move photo to uploads directory
                csv.mv('./' + csv.name);

                //push file details
                data.push({
                    name: csv.name,
                    mimetype: csv.mimetype,
                    size: csv.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

// Retrieve all
exports.process = async (req, res) => {
    const flightsCsv = await csv({noheader:true}).fromFile(__dirname + '/../../flights1.csv');
    const pnrCsv = await csv({noheader:true}).fromFile(__dirname + '/../../PNR1-task.csv');

    let flights = [];
    let pnrs = [];

    const createFlightsArray = x => {
        flights.push( {
            id: x.field1,
            origin: x.field2,
            dest: x.field3,
            capacity: x.field4,
            pnrs : []
        });
    };
    R.forEach(createFlightsArray, flightsCsv);
    flights.sort((a, b) => (a.capacity < b.capacity) ? 1 : -1);

    const createPnrArray = x => {
        pnrs.push( {
            id: x.field1,
            origin: x.field3,
            dest: x.field4,
            passengers: x.field2
        });
    };

    R.forEach(createPnrArray, pnrCsv);
    pnrs.sort((a, b) => (a.passengers < b.passengers) ? 1 : -1);


    for (let j = 0; j < pnrs.length; ++j) {

        for (let i = 0; i < flights.length; ++i) {
            if (flights[i].origin === pnrs[j].origin &&
                flights[i].dest === pnrs[j].dest &&
                flights[i].capacity >= pnrs[j].passengers) {

                flights[i].capacity = flights[i].capacity - pnrs[j].passengers;
                flights[i].pnrs.push(pnrs[j].id);
                pnrs[j].status = 'completed';
                break;
            } else {
                pnrs[j].status = 'incomplete';
            }
        }

    }
    //Check if we have pnrs required connection

    if(R.find(R.propEq('status', 'incomplete'))(pnrs) !== 'undefined'){
        let connectionRequired = R.find(R.propEq('status', 'incomplete'))(pnrs);
        
        for (let i = 0; i < flights.length; ++i) {
            if ((flights[i].origin === connectionRequired.origin ||
                flights[i].dest === connectionRequired.dest) &&
                flights[i].capacity >= connectionRequired.passengers) {

                flights[i].capacity = flights[i].capacity - connectionRequired.passengers;
                flights[i].pnrs.push(connectionRequired.id);
            }
        }
    }

    res.send(flights);
};
