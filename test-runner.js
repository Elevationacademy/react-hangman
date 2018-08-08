#!/usr/bin/env node
var jest = require('jest-cli');
const util = require('util');
const _ = require('lodash');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

var args = process.argv.splice(process.execArgv.length + 2);
var testName = args[0];

runTest()
    .then(() => {
    
    })
    .catch((err) => {
        console.log("Internal execution error: " + err);
    });

async function runTest(testNamePattern) {
    try {
        await exec('npm test');
    }

    catch(e) { 
        console.log("General error. Please contact the instructor team." + e);
    }
   
    var results = JSON.parse(fs.readFileSync('./test-results.json'));
    // No failed tests - pass the exercise
    if (results.numFailedTests ===  0) {
        console.log("Well done!");
        process.exit(0);
    }

    else {
        var failureMessage = "";
        results.testResults[0].testResults.forEach((t) => {
            if (t.status == 'failed') {
                failureMessage = failureMessage + t.fullName + "\n";
            }
        });
        
        console.log("Oops, you have a problem in there! \n" + failureMessage);
        process.exit(1);
    }

}

exports.runTest = runTest;