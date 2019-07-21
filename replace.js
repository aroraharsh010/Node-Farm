module.exports = function replace(htmlTemplate, id) {
  const fs = require("fs");
  let rawData = fs.readFileSync("data.json");
  let data = JSON.parse(rawData);
  var eachData = data[id];
  var output = htmlTemplate.replace(
    /{%productName%}/g,
    eachData["productName"]
  );
  output = output.replace(/{%image%}/g, eachData["image"]);
  output = output.replace(/{%from%}/g, eachData["from"]);
  output = output.replace(/{%nutrients%}/g, eachData["nutrients"]);
  output = output.replace(/{%price%}/g, eachData["price"]);
  output = output.replace(/{%description%}/g, eachData["description"]);
  output = output.replace(/{%quantity%}/g, eachData["quantity"]);
  output = output.replace(/{%ID%}/g, eachData["id"]);
  if (!eachData["organic"]) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};
