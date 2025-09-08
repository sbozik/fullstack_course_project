const generateHtmlFromYaml = require('swagger-yaml-to-html');

const inputFilePath = "./doc/spec.yaml";
const outputFilePath = "./doc/spec.html";

generateHtmlFromYaml(inputFilePath, outputFilePath);