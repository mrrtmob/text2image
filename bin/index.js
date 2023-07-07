#!/usr/bin/env node
var spawn = require("child_process").spawn;
var argv = require("yargs/yargs")(process.argv.slice(2)).argv;

const tesseract = spawn("which", ["tesseract"]);
tesseract.stdout.on("data", (data) => {
  if (typeof data == "string") {
    console.log(`${data}`);
  } else {
    const gg = spawn("sudo", ["apt", "install", "tesseract-ocr"]);
    gg.stdout.on("data", (data) => {
      console.log(`${data}`);
    });
    gg.stderr.on("data", (data) => {
      console.log(`${data}`);
    });
    gg.stderr.on("close", () => {
      console.log("Done");
    });
  }
});
tesseract.stderr.on("data", (data) => {
  console.log(`${data}`);
});

const { data, o, font } = argv;
var cmd = spawn("python3", [__dirname + "/split_training_text.py", data, o, font]);
cmd.stdout.on("data", (data) => {
  console.log(`${data}`);
});
cmd.stderr.on("data", (data) => {
  console.log(`${data}`);
});
cmd.stderr.on("close", () => {
  console.log("Done");
});
