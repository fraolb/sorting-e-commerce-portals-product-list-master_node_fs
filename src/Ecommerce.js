
//import all the require modules
const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

//write try catch to hanlde the exceptions

//More userdefined methods can be written if required to write the logical stuff

//return the callback with appropriate data where ever require in all the methods

//This method will read the file it takes two parameters first the fileName 
//and second the callback
const readFileContents = (fileName, cb) => {
  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      cb("Encountered error while reading file contents..!", null);
      return;
    }

    let fileContent = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      output: process.stdout,
      terminal: false
    });

    rl.on('line', (line) => {
      if (/\d/.test(line)) {
        fileContent.push(line);
      }
    });

    rl.on('close', () => {
      cb(null, fileContent);
    });
  });
}

//This method will sortDataonprice it will take two parameters one is fileContent
//second the callback
const sortDataOnPrice = (fileContents, cb) => {
  //use lodash.sortBy()
  const sortedData = _.sortBy(fileContents, (item) => parseInt(item.retail_price));
// console.log(sortedData)
  cb(null, sortedData);
}

//This method will sortDataonRating 
const sortDataOnRating = (fileContents, cb) => {
//use map where ever required 
  
//use lodash sortBy() and compact() if required
const data = fileContents.filter((i)=> i.product_rating != 'No rating available' )
const sortedData = _.sortBy(data, (item) => parseInt(item.product_rating));

console.log(sortedData)
  //use lodash.reverse() if required
  cb(null, _.reverse(sortedData));
}

//This method will write the sortedData in the output file
const writeSortedDataToFile = (outputFileName, sortedData, cb) => {
 fs.writeFile(outputFileName, sortedData.join('\n'), (error)=>{
  if(error){
    cb(error)
  }else{
    cb(null)
  }
 })
}





module.exports = {
    readFileContents,
    sortDataOnPrice,
    sortDataOnRating,
  
}